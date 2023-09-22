import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

export const CheckOut = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: req.body.products.map((product) => {
        return {
          price: {
            currency: "cfa",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: product.number,
        };
      }),
      payment_intent_data: {
        application_fee_amount: 123,
        transfer_data: Date.now(),
      },
      success_url: "https://127.0.0.1:3000/success",
      cancel_url: "https://127.0.0.1:3000/cancel",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
