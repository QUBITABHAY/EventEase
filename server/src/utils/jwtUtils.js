// In server/src/utils/jwtUtils.js
import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    return decoded.id; // This is the user ID from the token
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};