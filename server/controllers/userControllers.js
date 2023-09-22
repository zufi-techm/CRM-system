import { generateToken } from "../config/token.js";
import userModel from "../models/userModel.js";
import { validateId } from "../config/validateID.js";
import asynchandler from "express-async-handler";

const registerUser = asynchandler(async (req, res) => {
  const email = req.body.email;
  const userExists = await userModel.findOne({ email });
  try {
    if (userExists) {
      throw new Error("user already exists");
    } else {
      const newUser = await userModel.create(req.body);
      res.send({
        success: true,
        message: "user created successfully",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user && (await user.isPasswordMatched(password))) {
      let token = generateToken(user._id);
      res.send({
        success: true,
        message: "login successfull",
        token: token,
      });
    } else {
      throw new Error("incorrect email or password");
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
  const user = await userModel.findOne({ email });
});

const getAllUsers = asynchandler(async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const getUser = asynchandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    validateId(userId);
    const user = await userModel.findById(userId);
    if (user) {
      res.status(200);
      res.send({
        success: true,
        user: user,
      });
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const logoutUser = (req, res) => {
  const cookie = req.cookie;
  try {
    if (cookie) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
      });
    } else {
      res.status(204).json({ message: "logged out" });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (user) {
    const updated = await userModel.findByIdAndUpdate(userId, {
      name,
      email,
      phone,
    });
    updated.save();
    res.status(200).json(updated);
  } else {
    res.status(404);
    throw new Error("error occured");
  }
});

const deleteUser = asynchandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    validateId(userId);
    const user = await userModel.findById(userId);
    if (user) {
      await userModel.findByIdAndDelete(userId);
      res.status(200).json({ message: "user deleted" });
    } else {
      throw new Error("user no found");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
};
