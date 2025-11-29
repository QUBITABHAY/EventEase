import { Router } from "express";
import { registerForEvent, checkRegistrationStatus, getMyRegistrations } from "./registrationControllers.js";
import { isAuthenticated } from "../auth/authMiddleware.js";
import { validateRegistrationRequest, validateRegistrationStatusRequest } from "./registrationMiddleware.js";

const registrationRoutes = Router();

registrationRoutes.post("/register", isAuthenticated, validateRegistrationRequest, registerForEvent);
registrationRoutes.get("/check/:eventId", isAuthenticated, validateRegistrationStatusRequest, checkRegistrationStatus);
registrationRoutes.get("/my", isAuthenticated, getMyRegistrations);

export default registrationRoutes;
