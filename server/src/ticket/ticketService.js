import prisma from "../DB/db.config.js"

export const createTicketService = async (data) => {
    try {
        const { eventId, userId, ticketType, ticketPrice, ticketQuantity, ticketStatus } = data;

        const ticket = await prisma.ticket.create({
            data: {
                event: { connect: { id: parseInt(eventId) } },
                user: { connect: { id: parseInt(userId) } },
                ticketType,
                ticketPrice: parseFloat(ticketPrice),
                ticketQuantity: parseInt(ticketQuantity),
                ticketStatus,
            }
        })

        return { status: 200, message: "Ticket created successfully", data: ticket };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const getTicketService = async (eventId) => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                eventId: parseInt(eventId),
            }
        })

        return { status: 200, message: "Tickets fetched successfully", data: tickets };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "Internal Server Error" };
    }
}