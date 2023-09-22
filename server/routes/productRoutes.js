import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  addToCart,
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  removeFromCart,
  removeFromWishlist,
  updateProduct,
  cart,
  wishlist,
} from "../controllers/productControllers.js";
import {
  getByBrand,
  getByCategory,
  getBySearch,
} from "../controllers/filters.js";

const router = express.Router();

router.post("/create-product", authMiddleware, isAdmin, createProduct);
router.post("/add-to-cart", authMiddleware, addToCart);
router.post("/remove-from-cart", authMiddleware, removeFromCart);
router.get("/cart", authMiddleware, cart);
router.post("/add-to-wishlist", authMiddleware, addToWishlist);
router.post("/remove-from-wishlist", authMiddleware, removeFromWishlist);
router.get("/wishlist", authMiddleware, wishlist);
router.get("/:productId", getProduct);
router.get("/", authMiddleware, isAdmin, getAllProducts);
router.patch("/:productId", authMiddleware, isAdmin, updateProduct);
router.delete("/:productId", authMiddleware, isAdmin, deleteProduct);

//filters
router.get("/category/:value", getByCategory);
router.get("/brand/:value", getByBrand);
router.post("/search", getBySearch);
export default router;
