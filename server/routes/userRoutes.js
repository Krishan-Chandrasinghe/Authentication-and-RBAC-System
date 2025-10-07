import express from "express";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// All routes below are protected for 'admin' only
router.get("/", verifyToken, checkRole("admin"), getAllUsers);
router.post("/", verifyToken, checkRole("admin"), createUser);
router.put("/:id", verifyToken, checkRole("admin"), updateUser);
router.delete("/:id", verifyToken, checkRole("admin"), deleteUser);

export default router;
