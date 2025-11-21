import jwt from "jsonwebtoken";
import {
  localSignupService,
  localLoginService,
  completeProfileService,
  verifyOtpService
} from "./authServices.js";

export const verifyOtp = async (req, res) => {
  try {
    const result = await verifyOtpService(req.body);

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    const tempToken = jwt.sign(
      { id: result.user.id, email: result.user.email, temp: true },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return res.status(201).json({
      message: result.message,
      tempToken,
      userId: result.user.id,
      requiresProfile: true,
    });
  } catch (error) {
    console.error("Verify OTP controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const localSignup = async (req, res) => {
  try {
    const result = await localSignupService(req.body);

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    const tempToken = jwt.sign(
      { id: result.user.id, email: result.user.email, temp: true },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return res.status(201).json({
      message: result.message,
      tempToken,
      userId: result.user.id,
      requiresProfile: true,
    });
  } catch (error) {
    console.error("Local signup controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const completeProfile = async (req, res) => {
  try {
    const result = await completeProfileService(req.body);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: result.user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    console.error("Complete profile controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const localLogin = async (req, res) => {
  try {
    const result = await localLoginService(req.body);

    if (result.requiresProfile) {
      const tempToken = jwt.sign(
        { id: result.user.id, email: result.user.email, temp: true },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );

      return res.status(result.status).json({
        message: result.message,
        requiresProfile: true,
        tempToken,
        userId: result.user.id,
      });
    }

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: result.user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    console.error("Local login controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const oauthCallback = (req, res) => {
  try {
    const user = req.user;

    if (!user.isProfileComplete) {
      const tempToken = jwt.sign(
        { id: user.id, email: user.email, temp: true, provider: user.provider },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );

      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:4321"}/complete-profile?token=${tempToken}&userId=${user.id}`
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL || "http://localhost:4321"}/dashboard`);
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:4321"}/login?error=auth_failed`);
  }
};

export const oauthFailure = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL || "http://localhost:4321"}/login?error=auth_failed`);
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};