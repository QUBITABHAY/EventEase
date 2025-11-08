import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  logoutUser,
  getCurrentUser,
  loginUser,
} from "./userController.js";
import { createUserValidation, deleteUserValidation, getCurrentUserValidation, loginUserValidation, updateUserValidation } from "./userMiddleware.js";

const userRoutes = Router();

userRoutes.post("/register", createUserValidation,createUser);
userRoutes.post("/login", loginUserValidation, loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/me", getCurrentUserValidation, getCurrentUser);
userRoutes.put("/update", updateUserValidation, updateUser);
userRoutes.delete("/delete", deleteUserValidation, deleteUser);

export default userRoutes;
