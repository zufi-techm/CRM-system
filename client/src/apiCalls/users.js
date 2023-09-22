import { useState } from "react";
import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/users/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:5000/api/users/current-user"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:5000/api/users/"
    );
    return response.data.users;
  } catch (error) {
    console.log(error.message);
  }
};
export const DeleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `http://127.0.0.1:5000/api/users/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
