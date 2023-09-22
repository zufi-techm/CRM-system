import React, { useState } from "react";
import iphone from "../assets/e2.webp";
import { BsCart, BsHeart, BsX, BsXSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RemoveFromcart } from "../apiCalls/products";
const ProductInCart = ({ product }) => {
  const navigate = useNavigate();
  const [removed, setRemoved] = useState(false);
  const removeItem = async () => {
    try {
      await RemoveFromcart({ productId: product._id });
      window.location = window.location;
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="relative bg-gray-200 items-center cursor-pointer flex flex-col h-64 w-60   m-2 my-5 shadow-sm shadow-black">
      <div onClick={() => removeItem()} className="absolute top-2 right-2">
        <BsXSquareFill size={"1.5rem"} fill="red" />
      </div>
      <img
        onClick={() => navigate("/product", { state: { id: product._id } })}
        src={product?.image}
        className="h-2/3 w-full mx-10 "
      />
      <div className="p-2 text-sm font-bold">
        <h2 className="flex capitalize gap-2 items-center flex-col justify-between">
          <p>{product?.title?.substring(0, 13)}</p>
          <p className="text-blue-800">
            {product?.price?.toLocaleString() + " CFA"}
          </p>
          <div className="text-gray-600 text-sm flex items-center gap-2 mb-4">
            Number:<div className="text-blue-800">{product?.number}</div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default ProductInCart;
