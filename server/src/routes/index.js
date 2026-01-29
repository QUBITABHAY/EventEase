import { Router } from "express";
import userRoutes from "../users/userRoutes.js";
import eventRoutes from "../event/eventRoutes.js";
import authRoutes from "../auth/authRoutes.js";
import registrationRoutes from "../registration/registrationRoutes.js";
import reviewRoutes from "../review/reviewRoutes.js";
import ticketRoutes from "../ticket/ticketRoutes.js";

const routes = Router();

routes.use("/api/users", userRoutes);
routes.use("/api/events", eventRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/registrations", registrationRoutes);
routes.use("/api/reviews", reviewRoutes);
routes.use("/api/tickets", ticketRoutes);

export default routes;
