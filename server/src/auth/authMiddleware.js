import jwt, { decode } from 'jsonwebtoken';

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
  // REMOVE userId from destructured object (it should be set by prior middleware)
  // Ensure we check all fields the frontend sends: firstName, lastName, phone, role
  const { firstName, lastName, phone, role } = req.body; 

  if (!firstName || !lastName || !phone || !role) { // Updated check
    return res.status(400).json({
      message: "First name, last name, phone, and role are required",
    });
  }

  // NOTE: Remove the check for userId here, as it is now guaranteed by isAuthenticatedTemp

  if (firstName.trim().length === 0 || lastName.trim().length === 0) {
    return res.status(400).json({
      message: "First name and last name cannot be empty",
    });
  }
  
  // You might want to add phone number format validation here!

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
  // 1. Get token from cookie
  const token = req.cookies.token; 

  if (!token) {
      return res.status(401).json({ 
          message: "Authentication failed. No token provided.",
      });
  }

  try {
      // DEBUG: Log the secret used for verification
      // console.log('DEBUG: JWT_SECRET for VERIFICATION:', process.env.JWT_SECRET);
      
      // 2. Verify and decode the token
      // This line is the source of the "Invalid or expired token" error.
      const decoded = jwt.verify(token,token); 
      console.log("hahahahhahah",decoded)
      // 3. CRUCIAL Payload Checks: 
      if (!decoded.id || !decoded.temp) {
          console.error("Token payload check failed: Missing ID or temp flag.", decoded);
          return res.status(403).json({ 
              message: "Access denied. Token is permanent or corrupted.",
          });
      }

     
      
      // 4. Inject the userId into the body for subsequent controllers/validation
      req.body.userId = decoded.id; 
      
      console.log(`Authenticated Temp User ID: ${decoded.id}`);
      next();
  } catch (error) {
      // This handles ExpiredTokenError, JsonWebTokenError (invalid signature/secret mismatch)
      console.error("JWT Verification failed:", error.message);
      
      // FIX: Clear the invalid cookie to prevent infinite loop errors
      res.clearCookie("token", { path: '/' }); 

      return res.status(401).json({ 
          message: "Invalid or expired token.", 
          details: error.name 
      });
  }
};