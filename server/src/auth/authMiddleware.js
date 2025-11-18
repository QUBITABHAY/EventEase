export const localSignupValidation = (req, res, next) => {
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
  const { userId, firstName, lastName } = req.body;

  if (!userId || !firstName || !lastName) {
    return res.status(400).json({
      message: "User ID, first name, and last name are required",
    });
  }

  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ message: "Invalid user ID" });
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
