import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {
  deleteUser,
  getUserProfile,
  logUser,
  registerUser,
  updateUser,
} from "./routes/userRoutes.js";
import {
  UpdateCustomer,
  customerProfile,
  getCustomers,
  registerCustomer,
} from "./routes/customerRoutes.js";
import { verifyToken } from "../src/middleware/verifyToken.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", registerUser);
app.use("/auth", logUser);
app.use("/user", getUserProfile);
app.use("/user", deleteUser);
app.use("/", registerCustomer);
app.use("/", getCustomers);
app.use("/", customerProfile);
app.use("/", UpdateCustomer);
app.use("/", updateUser);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, async () => {
      console.log(`server running on port :${port}`);
    })
  )
  .catch((err) => console.log(err.message));
