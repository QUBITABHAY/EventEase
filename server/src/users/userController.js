
import { createUserService, deleteUserService, getCurrentUserService, loginUserService, logoutUserService, updateUserService } from "./userServices.js";
import jwt from "jsonwebtoken";

export const createUser = async(req, res) => {
  try {
    const data = req.body;

    const result = await createUserService(data)
    
    if (result?.status === 201) {
      return res.redirect("http://localhost:4321/login");
    }

    return res.status(result?.status || 500).json({ message: result?.message || "Internal Server Error" });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}

export const loginUser = async(req, res) => {
  try {
    const data = req.body;

    const result = await loginUserService(data);

    if (result?.status === 200 && result?.user) {
      const token = jwt.sign(
        { id: result.user.id, email: result.user.email, role: result.user.role },
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
    return res.redirect("http://localhost:4321/dashboard");
  }

    return res.status(result?.status || 500).json({ message: result?.message || "Internal Server Error" });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}

export const getCurrentUser = async(req, res) => {
  try {
    const token = req.user;
    const result = await getCurrentUserService(token);
    if (result?.status !== 200) {
      return res.status(result?.status || 401).json({ message: result?.message || "Unauthorized" });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}

export const updateUser = async(req, res) => {
  try {
    const data = req.body;

    const result = await updateUserService(data);
    return res.status(result?.status || 500).json({ message: result?.message || "Internal Server Error" });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}

export const deleteUser = async(req, res) => {
  try {
    const data = req.body;

    const result = await deleteUserService(data);
    return res.status(result?.status || 500).json({ message: result?.message || "Internal Server Error" });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}

export const logoutUser = async(req, res) => {
  try {
    const result = await logoutUserService();

    // Clear auth cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(result?.status || 200).json({ message: result?.message || "Logged out" });
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || "Internal Server Error" });
  }
}