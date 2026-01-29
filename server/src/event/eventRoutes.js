import { Router } from "express";
import {
  createEvent,
  getAllEvent,
  updateEvent,
  getEventById,
} from "./eventControllers.js";
import {
  createEventValidation,
  updateEventValidation,
} from "./eventMiddleware.js";

const eventRoutes = Router();

eventRoutes.get("/", getAllEvent);
eventRoutes.get("/:id", getEventById);
eventRoutes.post("/", createEventValidation, createEvent);
eventRoutes.put("/:id", updateEventValidation, updateEvent);

export default eventRoutes;
