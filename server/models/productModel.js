import mongoose from "mongoose";
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    properties: String,
    color: String,
    available: Boolean,
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;
