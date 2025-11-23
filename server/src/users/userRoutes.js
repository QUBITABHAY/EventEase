import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "./userController.js";
import {
  getCurrentUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "./userMiddleware.js";

const userRoutes = Router();

userRoutes.get("/me", getCurrentUserValidation, getCurrentUser);
userRoutes.put("/update", updateUserValidation, updateUser);
userRoutes.delete("/delete", deleteUserValidation, deleteUser);

export default userRoutes;
