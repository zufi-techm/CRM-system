import mongoose from "mongoose";
export const validateId = (id) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new Error("Invalid user ID");
    }
  } catch (error) {
    return error.message;
  }
};
