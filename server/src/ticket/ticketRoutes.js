import { Router } from "express";
import { createTicket, getTicket } from "./ticketController.js";
import { isAuthenticated } from "../auth/authMiddleware.js";
import { validateTicketCreation } from "./ticketMiddleware.js";

const ticketRoutes = Router();

ticketRoutes.post("/", isAuthenticated, validateTicketCreation, createTicket);
ticketRoutes.get("/:eventId", getTicket);

export default ticketRoutes;