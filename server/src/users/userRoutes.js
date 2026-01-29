import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
  resetPassword,
} from "./userController.js";
import {
  getCurrentUserValidation,
  updateUserValidation,
  deleteUserValidation,
  resetPasswordValidation,
} from "./userMiddleware.js";

const userRoutes = Router();

userRoutes.get("/me", getCurrentUserValidation, getCurrentUser);
userRoutes.put("/me", updateUserValidation, updateUser);
userRoutes.delete("/me", deleteUserValidation, deleteUser);
userRoutes.post("/password/reset", resetPasswordValidation, resetPassword);

export default userRoutes;
