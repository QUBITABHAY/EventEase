export const validateTicketCreation = (req, res, next) => {
    const { eventId, ticketType, ticketPrice, ticketQuantity, ticketStatus } = req.body;

    if (!eventId || !ticketType || ticketPrice === undefined || !ticketQuantity || !ticketStatus) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(eventId)) {
        return res.status(400).json({ message: "Event ID must be a number" });
    }

    if (typeof ticketType !== 'string' || ticketType.trim() === '') {
        return res.status(400).json({ message: "Ticket type must be a non-empty string" });
    }

    if (isNaN(ticketPrice) || parseFloat(ticketPrice) < 0) {
        return res.status(400).json({ message: "Ticket price must be a non-negative number" });
    }

    if (isNaN(ticketQuantity) || parseInt(ticketQuantity) <= 0) {
        return res.status(400).json({ message: "Ticket quantity must be a positive integer" });
    }

    next();
};
