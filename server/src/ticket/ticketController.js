import { createTicketService, getTicketService } from "./ticketService.js";

export const createTicket = async (req, res) => {
    try {
        const data = { ...req.body, userId: req.userId };
        const result = await createTicketService(data);
        return res.status(result.status).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTicket = async (req, res) => {
    try {
        const { eventId } = req.params;
        const result = await getTicketService(eventId);
        return res.status(result.status).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}