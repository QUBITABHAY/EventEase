import { Router } from "express";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use("/api/user", userRoutes);

export default routes;
