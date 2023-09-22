import express from "express";
import {
  // cancelOrder,
  CheckOut,
  // deleteOrder,
  // getAllOrders,
  // getOrder,
  // updateOrder,
} from "../controllers/orderControllers.js";
const router = express.Router();

router.post("/checkout", CheckOut);
// router.get("/", getAllOrders);
// router.get("/:orderId", getOrder);
// router.post("/cancel-order", cancelOrder);
// router.patch("/:orderId", updateOrder);
// router.delete("/:orderId", deleteOrder);

export default router;
