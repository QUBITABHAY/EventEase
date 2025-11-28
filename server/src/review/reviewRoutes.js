import { Router } from "express";
import { 
  saveReview, 
  getUserReview, 
  getEventReviews,
  deleteReview 
} from "./reviewController.js";
import { isAuthenticated } from "../auth/authMiddleware.js";

const router = Router();

// Get user's review for a specific event
router.get("/event/:id/user-review", isAuthenticated, getUserReview);

// Get all reviews for an event
router.get("/event/:eventId", getEventReviews);

// Create or update a review
router.post("/", isAuthenticated, saveReview);

// Delete a review
router.delete("/:id", isAuthenticated, deleteReview);

export default router;