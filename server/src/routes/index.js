import { Router } from "express";
import userRoutes from "../users/userRoutes.js";
import eventRoutes from "../event/eventRoutes.js";

const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/events", eventRoutes);

export default routes;
