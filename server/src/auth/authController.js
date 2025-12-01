import jwt from "jsonwebtoken";
import {
  localSignupService,
  localLoginService,
  completeProfileService,
  verifyOtpService,
  forgotPasswordService
} from "./authServices.js";

const getCookieOptions = (maxAge) => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge,
  };
};

export const verifyOtp = async (req, res) => {
  try {
    const result = await verifyOtpService(req.body);

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    const tempToken = jwt.sign(
      { id: result.user.id, email: result.user.email, temp: true },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    res.cookie("token", tempToken, getCookieOptions(30 * 60 * 1000));

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

    // Signup only sends OTP, no token needed yet until verification
    return res.status(201).json({
      message: result.message,
      userId: result.user?.id, // user might be null if just OTP sent
    });
  } catch (error) {
    console.error("Local signup controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const localLogin = async (req, res) => {
  try {
    const result = await localLoginService(req.body);

    if (result.requiresProfile) {
      const { id, email } = result.user;

      const tempToken = jwt.sign(
        {
          id: id,
          email: email,
          temp: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" },
      );

      res.cookie("token", tempToken, getCookieOptions(30 * 60 * 1000));

      return res.status(200).json({
        message: result.message || "Profile incomplete. Redirecting to setup.",
        requiresProfile: true,
        token: tempToken,
      });
    }

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: result.user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
    );

    res.cookie("token", token, getCookieOptions(24 * 60 * 60 * 1000));

    return res.status(200).json({
      message: result.message,
      user: result.user,
      token,
    });
  } catch (error) {
    console.error("Local login controller error:", error);
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
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
    );

    res.cookie("token", token, getCookieOptions(24 * 60 * 60 * 1000));

    return res.status(200).json({
      message: result.message,
      user: result.user,
      token,
    });
  } catch (error) {
    console.error("Complete profile controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const oauthCallback = (req, res) => {
  try {
    const user = req.user;
    const clientUrl = process.env.CLIENT_URL || "http://localhost:4321";

    if (!user.isProfileComplete) {
      const tempToken = jwt.sign(
        { id: user.id, email: user.email, temp: true, provider: user.provider },
        process.env.JWT_SECRET,
        { expiresIn: "30m" },
      );

      res.cookie("token", tempToken, getCookieOptions(30 * 60 * 1000));

      return res.redirect(
        `${clientUrl}/completeprofile?token=${tempToken}&userId=${user.id}`,
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
    );

    res.cookie("token", token, getCookieOptions(24 * 60 * 60 * 1000));

    res.redirect(`${clientUrl}/dashboard?token=${token}`);
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:4321"}/login?error=auth_failed`,
    );
  }
};

export const oauthFailure = (req, res) => {
  res.redirect(
    `${process.env.CLIENT_URL || "http://localhost:4321"}/login?error=auth_failed`,
  );
};

export const logout = (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await forgotPasswordService(email);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Forgot password controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};