import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import userRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHanndler, notFound } from "./middleware/errorHandler.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
connectDb();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHanndler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
