import express from "express";
import { customerModel } from "../models/CustomerModel.js";
import { userModel } from "../models/UserModel.js";
import { verifyToken } from "../middleware/verifyToken.js";
import mongoose from "mongoose";
const router = express.Router();

export const registerCustomer = router.post(
  "/register-customer/:userId",
  async (req, res) => {
    try {
      const date = new Date();
      const {
        firstname,
        lastname,
        email,
        telephone,
        lead_source,
        gender,
        age,
        description,
        imageUrl,
        time,
        userOwner,
      } = req.body;
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      if (user?.customers?.includes(email)) {
        return res.json({ message: "this customer already exists" });
      } else {
        const newCustomer = await new customerModel({
          firstname,
          lastname,
          email,
          telephone,
          lead_source,
          gender,
          age,
          description,
          imageUrl,
          time: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`.toString(),
          userOwner,
        });
        await newCustomer.save();
        await user?.customers?.push(newCustomer.email);
        await user.save();
        return res.json({ message: "customer created" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getCustomers = router.get(
  "/customers/:userId",
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.sendStatus(404);
      }
      const user = await userModel.findById(userId);
      const allCustomers = await customerModel.find({
        email: { $in: user?.customers },
      });
      return res.json(allCustomers);
    } catch (error) {}
  }
);

export const customerProfile = router.get(
  "/customer-profile/:cust_id",
  verifyToken,
  async (req, res) => {
    try {
      const cust_id = req.params.cust_id;
      if (!cust_id) {
        return res.json({ message: "customer not found" });
      }
      const custData = await customerModel.findById({ _id: cust_id });
      return res.json(custData);
    } catch (error) {
      res.json({ ERR: error.message });
    }
  }
);

export const UpdateCustomer = router.put(
  "/update-customer/:cust_id",
  async (req, res) => {
    try {
      const cust_id = req.params.cust_id.toString();
      const {
        firstname,
        lastname,
        email,
        telephone,
        lead_source,
        gender,
        age,
        description,
        name,
        image,
        password,
        userOwner,
      } = req.body;

      if (!cust_id) {
        return res.json({ message: "customer not found" });
      }
      const newData = await customerModel.findByIdAndUpdate(cust_id, {
        firstname,
        lastname,
        email,
        telephone,
        lead_source,
        gender,
        age,
        description,
        name,
        image,
        password,
        userOwner,
      });
      await newData.save();
      res.json({ message: "customer updated" });
    } catch (error) {
      res.json({ ERR: error.message });
    }
  }
);
export const deletCustomer = router.delete(
  "/customer-profile/:cust_id",
  async (req, res) => {
    try {
      const cust_id = req.params.cust_id;
      const customer = await customerModel.findById({ _id: cust_id });
      if (!customer) {
        return res.json({ message: "customer not found" });
      }
      await customerModel.findByIdAndDelete({ _id: cust_id });
      res.json({ message: "customer deleted" });
    } catch (error) {
      res.json({ ERR: error.message });
    }
  }
);
