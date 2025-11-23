import { Router } from "express";
import {
    getAllEvents,
    getEventById,
    createEvent,
    registerForEvent,
    getRegisteredEvents,
    getOrganizerEvents,
    updateEvent,
    deleteEvent,
    getOrganizerStats,
    getEventRegistrations
} from "./eventControllers.js";
import { getCurrentUserValidation } from "../users/userMiddleware.js";

const eventRoutes = Router();

// Public routes
eventRoutes.get("/", getAllEvents);

// Organizer/User Protected Routes
// Place specific routes BEFORE /:id to avoid conflict
eventRoutes.get("/my/registered", getCurrentUserValidation, getRegisteredEvents);
eventRoutes.get("/organizer/my-events", getCurrentUserValidation, getOrganizerEvents);
eventRoutes.get("/organizer/stats", getCurrentUserValidation, getOrganizerStats);
eventRoutes.get("/organizer/registrations", getCurrentUserValidation, getEventRegistrations);

eventRoutes.post("/", getCurrentUserValidation, createEvent);
eventRoutes.get("/:id", getEventById); // This matches anything, so keep it lower if possible, but specific paths above handle their cases.
eventRoutes.put("/:id", getCurrentUserValidation, updateEvent);
eventRoutes.delete("/:id", getCurrentUserValidation, deleteEvent);
eventRoutes.post("/:id/register", getCurrentUserValidation, registerForEvent);

export default eventRoutes;
