import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      res.json({ status: 400, message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashpassword,
        phone,
        role: role ? role.toUpperCase() : "USER",
      },
    });

    res.redirect("http://localhost:4321/login"); // Redirect to login page after successful registration
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkDetil) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, checkDetil.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: checkDetil.id, email: checkDetil.email, role: checkDetil.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };

    res.cookie("token", token, cookieOptions);

    res.redirect("http://localhost:4321/dashboard"); // Redirect to dashboard on successful login
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { newName, email, newPassword, newRole } = req.body;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetil) {
      res.send({ message: "Invalid credential" });
    }

    const data = await prisma.user.update({
      where: {
        id: checkDetil.id,
      },



      data: {
        name: newName,
        password: await bcrypt.hash(newPassword, 10),
        role: newRole,
      },
    });

    res.send({ message: "User updated", data: data });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetil) {
      res.send({ message: "Invalid credential" });
    }

    const checkPassword = await bcrypt.compare(password, checkDetil.password);

    if (!checkPassword) {
      res.send({ message: "Invalid credential" });
    }

    const result = await prisma.user.delete({ where: { email } });

    if (!result) {
      res.send({ message: "Invalid User" });
    }

    res.send({ message: "User Deleted Sucessfully" });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    
    res.status(200).json({ 
      success: true,
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      data: user 
    });

  } catch (error) {
    // Development log
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false,
        message: "Token expired" 
      });
    }
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};
