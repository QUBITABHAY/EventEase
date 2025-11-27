import jwt from "jsonwebtoken";

export const localSignupValidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  next();
};

export const completeProfileValidation = (req, res, next) => {
  const { firstName, lastName, phone, role } = req.body;

  if (!firstName || !lastName || !phone || !role) {
    return res.status(400).json({
      message: "First name, last name, phone, and role are required",
    });
  }

  if (firstName.trim().length === 0 || lastName.trim().length === 0) {
    return res.status(400).json({
      message: "First name and last name cannot be empty",
    });
  }

  next();
};

export const localLoginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

export const isAuthenticatedTemp = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !decoded.temp) {
      return res.status(403).json({
        message: "Access denied. Token is permanent or corrupted.",
      });
    }

    req.body.userId = decoded.id;

    console.log(`Authenticated Temp User ID: ${decoded.id}`);
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    res.clearCookie("token", { path: "/" });

    return res.status(401).json({
      message: "Invalid or expired token.",
      details: error.name,
    });
  }
};

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(403).json({
        message: "Access denied. Invalid token.",
      });
    }

    req.userId = decoded.id;

    console.log(`Authenticated User ID: ${decoded.id}`);
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    res.clearCookie("token", { path: "/" });

    return res.status(401).json({
      message: "Invalid or expired token.",
      details: error.name,
    });
  }
};
