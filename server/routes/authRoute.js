import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/logout", logoutUser);
router.get("/current-user", authMiddleware, getUser);
router.delete("/delete-user/:userId", deleteUser);
router.patch("/update-user", authMiddleware, isAdmin, updateUser);
export default router;
