import React, { useState } from "react";
import iphone from "../assets/e2.webp";
import { BsCart, BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  Addtocart,
  Addtowishlist,
  RemoveFromWishlist,
} from "../apiCalls/products";
const ProductCard = ({ product, onclick }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [addWishlist, setAddWish] = useState(false);
  const addToCart = async (e) => {
    if (window.location.href === "http://localhost:3000/") {
      navigate("/login");
    }
    try {
      setLoading(true);
      await Addtocart({
        _id: product?._id,
        title: product?.title,
        number: 1,
        price: Number(product?.price),
        image: product?.image,
      }).then((res) => {
        setAdded(true);
        setLoading(false);
      });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const addToWishlist = async (e) => {
    try {
      setAddWish((c) => !c);
      setLoading(true);
      await Addtowishlist({
        _id: product?._id,
      }).then((res) => {
        console.log(res);
        setLoading(false);
      });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="relative px-2 bg-white items-center cursor-pointer flex flex-col h-80 card m-2 my-5 shadow-sm shadow-black">
      <div onClick={(e) => addToWishlist(e)} className="absolute top-2 right-2">
        {!addWishlist ? <BsHeart /> : <BsHeartFill color="red" />}
      </div>
      <img
        src={product?.image}
        onClick={onclick}
        className="h-2/3 w-full  bg-gray-300"
      />
      <div className="p-2 text-sm font-bold">
        <h2 className="flex capitalize gap-2 items-center justify-between">
          <p>{product?.title.substring(0, 13)}</p>
          <p className="text-blue-800 text-xl">
            {product?.price.toLocaleString() + " CFA"}
          </p>
        </h2>
        <p className="text-sm font-semibold">
          {product?.description.substring(0, 17) + "..."}
        </p>
      </div>
      <button
        onClick={(e) => addToCart(e)}
        disabled={added ? true : false}
        className="w-1/2 flex justify-center  items-center  ml-2  bg-blue-800 rounded-full py-1 px-2 font-bold text-white"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
