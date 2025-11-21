import { Router } from "express";
import passport from "./passport.config.js";
import {
  localSignup,
  localLogin,
  completeProfile,
  oauthCallback,
  oauthFailure,
  logout,
  verifyOtp,
} from "./authController.js";
import {
  localSignupValidation,
  localLoginValidation,
  completeProfileValidation,
} from "./authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/local/signup", localSignupValidation, localSignup);
authRoutes.post("/local/verify-otp", verifyOtp);
authRoutes.post("/local/login", localLoginValidation, localLogin);
authRoutes.post("/local/complete-profile", completeProfileValidation, completeProfile);
authRoutes.post("/logout", logout);
authRoutes.get("/google", passport.authenticate("google", { session: false }));

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  oauthCallback
);

authRoutes.get("/failure", oauthFailure);

export default authRoutes;