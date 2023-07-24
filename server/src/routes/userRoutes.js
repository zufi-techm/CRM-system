import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { userModel } from "../models/UserModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

export const registerUser = router.post("/register", async (req, res) => {
  const { name, email, image, password } = await req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.json({ message: "user already exists" });
  } else {
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await new userModel({
      name,
      email,
      image,
      password: hashedpassword,
    });
    await newUser.save();
    res.status(200).json({ message: "account created successfully" });
  }
});

export const logUser = router.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    const matchedPassword = await bcrypt.compare(
      password,
      await userExists.password
    );
    if (matchedPassword) {
      const token = await jwt.sign(
        { id: userExists._id },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .json({ userId: userExists._id, token: token, name: userExists.name });
    } else {
      return res.json({ message: "incorrect email or password" });
    }
  } else {
    return res.json({ message: "incorrect email or password" });
  }
});

export const getUserProfile = router.get(
  "/profile/:userId",
  verifyToken,
  async (req, res) => {
    try {
      const userId = await req.params.userId;
      const user = await userModel.findById(userId);
      if (user) {
        res.json(user);
      } else {
        res.json({ message: "account not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateUser = router.put(
  "/update-user/:userId",
  async (req, res) => {
    try {
      const { name, email, password } = await req.body;
      const hashedpassword = await bcrypt.hash(password, 10);
      const userId = await req.params;
      const newData = await userModel.findByIdAndUpdate(userId, {
        name: name,
        email: email,
        password: hashedpassword,
      });
      await newData.save();
      return res.json({ message: "profile updated" });
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteUser = router.delete(
  `/delete-user/:userId`,
  async (req, res) => {
    try {
      const userId = await req.params.userId;
      await userModel.findByIdAndDelete(userId);
      res.json({ message: "Account deleted" });
    } catch (error) {
      res.json({ message: "an error occured" });
    }
  }
);
