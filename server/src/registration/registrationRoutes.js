import { Router } from "express";
import { registerForEvent, checkRegistrationStatus, getMyRegistrations, verifyTicket, getEventRegistrations } from "./registrationControllers.js";
import { isAuthenticated } from "../auth/authMiddleware.js";
import { isOrganizer } from "../auth/authMiddleware.js";

const registrationRoutes = Router();

registrationRoutes.post("/register", isAuthenticated, registerForEvent);
registrationRoutes.get("/status/:eventId", isAuthenticated, checkRegistrationStatus);
registrationRoutes.get("/my-registrations", isAuthenticated, getMyRegistrations);
registrationRoutes.post("/verify", isAuthenticated, isOrganizer, verifyTicket);
registrationRoutes.get("/registrations/:eventId", isAuthenticated, isOrganizer, getEventRegistrations);

export default registrationRoutes;
