import asyncHandler from "express-async-handler";
import productModel from "../models/productModel.js";

export const getByCategory = asyncHandler(async (req, res) => {
  try {
    const { value } = req.params;
    const products = await productModel.find({ category: value });
    res.send({
      success: true,
      products,
    });
    res.status(200);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const getByBrand = asyncHandler(async (req, res) => {
  try {
    const { value } = req.params;
    const products = await productModel.find({ brand: value });
    res.send({
      success: true,
      products,
    });
    res.status(200);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
export const getBySearch = asyncHandler(async (req, res) => {
  try {
    const products = await productModel
      .find({
        title: { $regex: new RegExp(req.body.search) },
      })
      .limit(4);

    res.send(products);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
