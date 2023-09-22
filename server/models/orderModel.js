import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        count: Number,
        color: String,
      },
    ],
    paymentMethod: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
