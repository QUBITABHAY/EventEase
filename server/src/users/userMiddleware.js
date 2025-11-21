import jwt from "jsonwebtoken";

export const createUserValidation = (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
};

export const loginUserValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

export const getCurrentUserValidation = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};

export const updateUserValidation = (req, res, next) => {
  const { firstName, lastName, password, role } = req.body;

  if (!firstName && !lastName && !password && !role) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  next();
};

export const deleteUserValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};
