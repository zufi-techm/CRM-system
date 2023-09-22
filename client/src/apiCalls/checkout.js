import { axiosInstance } from "./axiosInstance";
export const CheckOut = async (data) => {
  const response = await axiosInstance.post(
    "http://127.0.0.1:5000/api/orders/checkout",
    { products: data }
  );
  return response.data.message;
};
