import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  password: { type: String, required: true },
  customers: [{ type: String, ref: "customers" }],
});
export const userModel = mongoose.model("users", userSchema);
