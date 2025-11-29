export const validateRegistrationRequest = (req, res, next) => {
    const { eventId } = req.body;
    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
    }
    next();
};

export const validateRegistrationStatusRequest = (req, res, next) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
    }
    next();
};
