import prisma from "../DB/db.config.js";
import { getUserIdFromToken } from '../utils/jwtUtils.js';


// Get user's review for a specific event
export const getUserReview = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const numericUserId = parseInt(userId);
    if (isNaN(numericUserId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const review = await prisma.review.findFirst({
      where: {
        eventId: parseInt(eventId),
        userId: numericUserId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
          },
        },
      },
    });

    res.status(200).json({ review });
  } catch (error) {
    console.error("Error fetching user review:", error);
    res.status(500).json({ message: "Failed to fetch review" });
  }
};
// Get all reviews for an event
export const getEventReviews = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const reviews = await prisma.review.findMany({
      where: {
        eventId: parseInt(eventId),
      },
      select: {
        id: true,
        rating: true,
        feedback: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average rating
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.status(200).json({ 
      reviews, 
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error("Error fetching event reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// Submit or update a review
export const saveReview = async (req, res) => {
  const { eventId, rating, feedback } = req.body;
  console.log(eventId, rating, feedback);
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // 1. Validate event exists
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) }
    });

    if (!event) {
      return res.status(404).json({ 
        message: "Event not found. Cannot submit review for non-existent event." 
      });
    }

    // 2. Check if user is registered for the event (optional but recommended)
    const registration = await prisma.registration.findFirst({
      where: {
        eventId: parseInt(eventId),
        userId: parseInt(userId),
        paymentStatus: 'COMPLETED'
      }
    });

    if (!registration) {
      return res.status(403).json({ 
        message: "You must register and complete payment before reviewing this event." 
      });
    }

    // 3. Check for existing review

    const existingReviewofUser = await prisma.review.find({
      where: {
        userId: parseInt(userId)
      },
    });

    const existingReview = existingReviewofUser.find(review => review.eventId === parseInt(eventId));


    // const existingReview = await prisma.review.findFirst({
    //   where: {
    //     eventId: parseInt(eventId),
    //     userId: parseInt(userId)
    //   },
    // });


    if (existingReview) {
      const updatedReview = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          rating: parseInt(rating),
          feedback: feedback?.trim() || null,
        },
      });
      
      return res.status(200).json({ 
        message: "Review updated successfully", 
        review: updatedReview 
      });
    }

    // 4. Create new review
    const newReview = await prisma.review.create({
      data: {
        eventId: parseInt(eventId),
        userId: parseInt(userId),
        rating: parseInt(rating),
        feedback: feedback?.trim() || null,
      },
    });

    res.status(201).json({ 
      message: "Review submitted successfully", 
      review: newReview 
    });

  } catch (error) {
    console.error("Error in saveReview:", {
      error: error.message,
      eventId,
      userId,
      stack: error.stack
    });
    
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        message: "Invalid event or user reference. Please check the event ID and try again." 
      });
    }
    
    res.status(500).json({ 
      message: "An error occurred while processing your review." 
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== parseInt(userId)) {
      return res.status(403).json({ 
        message: "You are not authorized to delete this review" 
      });
    }

    await prisma.review.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ 
      message: error.message || "An error occurred while deleting the review." 
    });
  }
};