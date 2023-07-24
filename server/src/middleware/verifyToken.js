import jwt from "jsonwebtoken";
import { userModel } from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
};
