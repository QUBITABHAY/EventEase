import { Router } from "express";
import { githubPassport, googlePassport } from "./passport.config.js";
import {
  localSignup,
  localLogin,
  completeProfile,
  oauthCallback,
  oauthFailure,
  logout,
  verifyOtp,
  forgotPassword,
} from "./authController.js";
import {
  localSignupValidation,
  localLoginValidation,
  completeProfileValidation,
  isAuthenticatedTemp,
} from "./authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/local/signup", localSignupValidation, localSignup);
authRoutes.post("/local/verify-otp", verifyOtp);
authRoutes.post("/local/login", localLoginValidation, localLogin);
authRoutes.post("/local/complete-profile", isAuthenticatedTemp, completeProfileValidation, completeProfile);
authRoutes.post("/logout", logout);
authRoutes.get("/google", googlePassport.authenticate("google", { session: false }));

authRoutes.get(
  "/google/callback",
  googlePassport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  oauthCallback,
);

authRoutes.get("/github", githubPassport.authenticate("github", { session: false }));
authRoutes.get("/github/callback", githubPassport.authenticate("github", { session: false }), oauthCallback);

authRoutes.get("/failure", oauthFailure);

authRoutes.post("/forgot-password", forgotPassword);

export default authRoutes;
