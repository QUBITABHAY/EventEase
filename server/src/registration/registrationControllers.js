import { createRegistrationService } from "./registrationServices.js";
import prisma from "../DB/db.config.js";

export const registerForEvent = async (req, res) => {
    try {
        const userId = req.userId; // Set by isAuthenticated middleware
        const { eventId } = req.body;

        // Check if event exists
        const event = await prisma.event.findUnique({
            where: { publicId: eventId },
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check for duplicate registration
        const existingRegistration = await prisma.registration.findFirst({
            where: {
                userId,
                eventId: event.id,
            },
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this event" });
        }

        // Check capacity
        const registrationCount = await prisma.registration.count({
            where: { eventId: event.id },
        });

        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: "Event is full" });
        }

        // Determine payment status
        let paymentStatus = "PENDING";
        if (event.price === 0) {
            paymentStatus = "COMPLETED";
        }

        // Generate ticketId (simple uuid or similar, but schema says String @unique)
        // Using a simple random string for now, or could use uuid if imported
        const ticketId = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`; // Placeholder

        const registrationData = {
            userId,
            eventId: event.id,
            ticketId,
            qrCodeUrl,
            paymentStatus,
        };

        const result = await createRegistrationService(registrationData);

        return res.status(result.status).json({
            message: result.message,
            registration: result.registration,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Check if user is registered for a specific event
export const checkRegistrationStatus = async (req, res) => {
    try {
        const userId = req.userId; // Set by isAuthenticated middleware
        const { eventId } = req.params;

        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }

        const event = await prisma.event.findUnique({
            where: { publicId: eventId },
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const registration = await prisma.registration.findFirst({
            where: {
                userId,
                eventId: event.id,
            },
        });

        return res.status(200).json({
            isRegistered: !!registration,
            registration: registration || null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.userId;

        const registrations = await prisma.registration.findMany({
            where: {
                userId: userId,
            },
            include: {
                event: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            status: 200,
            data: registrations,
        });
    } catch (error) {
        console.error("Error fetching my registrations:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;

        if (!ticketId) {
            return res.status(400).json({ message: "Ticket ID is required" });
        }

        const registration = await prisma.registration.findUnique({
            where: { ticketId },
            include: { user: true, event: true }
        });

        if (!registration) {
            return res.status(404).json({ message: "Invalid Ticket ID" });
        }

        if (registration.checkedIn) {
            return res.status(400).json({ message: "Ticket already used", registration });
        }

        const updatedRegistration = await prisma.registration.update({
            where: { id: registration.id },
            data: { checkedIn: true }
        });

        return res.status(200).json({
            message: "Ticket verified successfully",
            registration: updatedRegistration
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }

        const registrations = await prisma.registration.findMany({
            where: {
                eventId: parseInt(eventId)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profilePicture: true
                    }
                },
                tickets: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            status: 200,
            registrations
        });

    } catch (error) {
        console.error("Error fetching event registrations:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
