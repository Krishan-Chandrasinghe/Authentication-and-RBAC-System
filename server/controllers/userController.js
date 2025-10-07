import User from "../models/User.js";
import bcrypt from "bcrypt";

// 🟢 Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshToken"); // exclude sensitive fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Create new user
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashed, role });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const update = {};

    if (username) update.username = username;
    if (role) update.role = role;
    if (password) update.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
