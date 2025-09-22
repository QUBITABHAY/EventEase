import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
