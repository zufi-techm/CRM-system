import express from "express";
import asyncHandler from "express-async-handler";
import { validateId } from "../config/validateID.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
export const createProduct = asyncHandler(async (req, res) => {
  try {
    await productModel.create(req.body);
    res.send({
      success: true,
      message: "product created",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  validateId(productId);
  try {
    const product = await productModel.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const users = await productModel.find();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
});

export const wishlist = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    let product = [];
    for (let index = 0; index < user.wishlist.length; index++) {
      const element = user.wishlist[index];
      let p = await productModel.findById(element).populate();
      product.push(p);
    }
    res.send({ product: product });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
export const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    validateId(userId);
    const user = await userModel.findById(userId);
    if (user.wishlist.includes(req.body.toString())) {
      throw new Error("Already added");
    } else {
      user.wishlist.push(req.body);
      await user.save();
      res.send({
        success: true,
        message: "added to wishlist",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    validateId(userId);
    const { productId } = req.body;
    validateId(productId);
    const user = await userModel.findById(userId);
    user.wishlist.pop(productId);
    await user.save();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
export const cart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    res.send(user.cart);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    validateId(userId);
    const { productId } = req.body;
    validateId(productId);
    const user = await userModel.findById(userId);
    user.cart.push(req.body);
    await user.save();
    res.send({
      success: true,
      message: "product added to cart",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    validateId(userId);
    const { productId } = req.body;
    validateId(productId);
    const user = await userModel.findById(userId);
    user.cart.filter((el, i) => {
      el?._id.toString() === productId.toString() && user.cart.pop(el);
    });
    res.json({ success: true, message: "removed" });
    user.save();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    validateId(productId);
    const updated = await productModel.findByIdAndUpdate(productId, req.body);
    res.send({
      success: true,
      message: "product updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    validateId(productId);
    await productModel.findByIdAndDelete(productId);
    res.send({
      success: true,
      message: "product deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
