import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String },
  telephone: { type: String },
  lead_source: { type: String },
  gender: { type: String },
  age: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  time: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
export const customerModel = mongoose.model("customers", customerSchema);
