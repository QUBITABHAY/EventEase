import { Router } from "express";
import userRoutes from "../users/userRoutes.js";
import eventRoutes from "../event/eventRoutes.js";
import authRoutes from "../auth/authRoutes.js";
import registrationRoutes from "../registration/registrationRoutes.js";
import reviewRoutes from "../review/reviewRoutes.js";

const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/event", eventRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/registration", registrationRoutes);
routes.use("/api/reviews", reviewRoutes)

export default routes;
