import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", getUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
