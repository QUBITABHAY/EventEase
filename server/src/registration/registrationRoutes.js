import { Router } from "express";
import { registerForEvent, checkRegistrationStatus } from "./registrationControllers.js";
import { isAuthenticated } from "../auth/authMiddleware.js";

const registrationRoutes = Router();

registrationRoutes.post("/register", isAuthenticated, registerForEvent);
registrationRoutes.get("/check/:eventId", isAuthenticated, checkRegistrationStatus);

export default registrationRoutes;
