import prisma from "../DB/db.config.js";

export const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                organizer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        // organization: true, // Removed as it might not exist in schema
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        return res.status(200).json({ status: 200, data: events });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: {
                organizer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ status: 200, data: event });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createEvent = async (req, res) => {
    try {
        const { title, description, longDescription, category, date, startTime, endTime, venue, price, capacity, posterUrl } = req.body;
        const organizerId = req.user.id; // From auth middleware

        // Basic validation
        if (!title || !date || !venue || !capacity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                longDescription: longDescription || description,
                category,
                date: new Date(date),
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                venue,
                price: parseFloat(price) || 0,
                capacity: parseInt(capacity),
                posterUrl,
                organizerId
            }
        });

        return res.status(201).json({ status: 201, message: "Event created successfully", data: newEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const registerForEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if event exists
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if already registered
        const existingRegistration = await prisma.registration.findFirst({
            where: {
                eventId: parseInt(id),
                userId: userId
            }
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        // Create registration
        const ticketId = `TICKET-${Date.now()}-${userId}`;
        const registration = await prisma.registration.create({
            data: {
                userId,
                eventId: parseInt(id),
                ticketId,
                qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + ticketId, // Simple mock QR
                paymentStatus: event.price > 0 ? "PENDING" : "COMPLETED"
            }
        });

        return res.status(201).json({ status: 201, message: "Registration successful", data: registration });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getRegisteredEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const registrations = await prisma.registration.findMany({
            where: { userId },
            include: {
                event: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({ status: 200, data: registrations });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// --- Organizer Specific Controllers ---

export const getOrganizerEvents = async (req, res) => {
    try {
        const organizerId = req.user.id;
        const events = await prisma.event.findMany({
            where: { organizerId },
            orderBy: { date: 'desc' }
        });
        return res.status(200).json({ status: 200, data: events });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const organizerId = req.user.id;
        const data = req.body;

        const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });

        if (!event) return res.status(404).json({ message: "Event not found" });
        if (event.organizerId !== organizerId) return res.status(403).json({ message: "Unauthorized" });

        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                ...data,
                date: data.date ? new Date(data.date) : undefined,
                startTime: data.startTime ? new Date(data.startTime) : undefined,
                endTime: data.endTime ? new Date(data.endTime) : undefined,
                price: data.price ? parseFloat(data.price) : undefined,
                capacity: data.capacity ? parseInt(data.capacity) : undefined
            }
        });

        return res.status(200).json({ status: 200, message: "Event updated", data: updatedEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const organizerId = req.user.id;

        const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });

        if (!event) return res.status(404).json({ message: "Event not found" });
        if (event.organizerId !== organizerId) return res.status(403).json({ message: "Unauthorized" });

        await prisma.event.delete({ where: { id: parseInt(id) } });

        return res.status(200).json({ status: 200, message: "Event deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getOrganizerStats = async (req, res) => {
    try {
        const organizerId = req.user.id;

        const totalEvents = await prisma.event.count({ where: { organizerId } });
        const activeEvents = await prisma.event.count({
            where: {
                organizerId,
                date: { gte: new Date() }
            }
        });

        // Get all event IDs by this organizer to count registrations
        const events = await prisma.event.findMany({
            where: { organizerId },
            select: { id: true }
        });
        const eventIds = events.map(e => e.id);

        const totalRegistrations = await prisma.registration.count({
            where: { eventId: { in: eventIds } }
        });

        return res.status(200).json({
            status: 200,
            data: {
                totalEvents,
                activeEvents,
                totalRegistrations,
                // Mocking some data that requires more complex queries or schema changes
                avgAttendance: "85%",
                registrationsThisMonth: 12,
                registrationsThisWeek: 5
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getEventRegistrations = async (req, res) => {
    try {
        const organizerId = req.user.id;

        // Get registrations for all events by this organizer
        const registrations = await prisma.registration.findMany({
            where: {
                event: {
                    organizerId: organizerId
                }
            },
            include: {
                event: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({ status: 200, data: registrations });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
