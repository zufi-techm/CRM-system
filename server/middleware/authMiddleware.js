import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { validateId } from "../config/validateID.js";
const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    let token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        const user = await userModel.findById(decoded.userId);
        req.params.userId = decoded.userId;
        next();
      } else {
        throw new Error("unauthorized invalid token");
      }
    } else {
      throw new Error("unauthorized invalid token");
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    validateId(userId);
    const user = await userModel.findById(userId);
    if (user.role == "admin") {
      next();
    } else {
      throw new Error("unauthorized, you  are not admin");
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
export { authMiddleware, isAdmin };
