import React, { useEffect, useState } from "react";
import {
  BsCart,
  BsChatRight,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsPlusLg,
  BsSubtract,
} from "react-icons/bs";

import accountAvatar from "../../assets/account-avatart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import iphone from "../../assets/e2.webp";
import { Addtocart, Getproduct } from "../../apiCalls/products";
import Nav from "../../components/Nav";
import { CheckOut } from "../../apiCalls/checkout";
const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, setNum] = useState(1);
  const getProduct = async () => {
    await Getproduct(location.state.id).then((response) => {
      setProduct(response);
    });
  };
  const decrease = () => {
    if (number <= 1) {
      return;
    }
    setNum(number - 1);
  };
  const addToCart = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await Addtocart({
        _id: product?._id,
        title: product?.title,
        number: number,
        price: Number(product?.price) * number,
        image: product?.image,
      }).then((res) => {
        setLoading(false);
        navigate("/cart");
      });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  //checkout
  const pay = async () => {
    try {
      await CheckOut({
        _id: product?._id,
        title: product?.title,
        number: number,
        price: Number(product?.price) * number,
        image: product?.image,
      });
    } catch (error) {
      navigate("/pay-cancel");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="bg-white h-screen">
      <Nav />
      {product && (
        <section className="flex  h-full pt-20 pb-10 px-10 bg-blue-100">
          <div className="h-full flex bg-white p-2 shadow-sm shadow-black w-full  rounded-md">
            <img src={product.image} className="h-full  w-1/2" />
            <div className="flex flex-col py-4 w-1/2 items-center justify-between">
              <h1 className="text-3xl capitalize text-cyan-600 font-bold">
                {product.title}
              </h1>
              <div className="text-xl text-blue-800 flex gap-2 font-bold items-center">
                price:{product.price.toLocaleString() + " CFA"}
              </div>
              <div className="flex font-bold items-center gap-1">
                {product.color}
                <p className={`h-7 w-7 ${product.color}`}>{""}</p>
              </div>
              <p>{product.description}</p>
              <div>
                {product.properties.split("-").map((el, i) => {
                  return (
                    <p key={i} className="text-xs">
                      {el}
                    </p>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 justify-center flex-col text-xs font-bold text-gray-800">
                <p>Add Quantity</p>
                <div className="flex items-center gap-2">
                  <button
                    className="h-10 bg-red-400 px-3 text-xl text-white rounded-md font-bold"
                    onClick={decrease}
                  >
                    -
                  </button>
                  <p className="font-bold text-xl">{number}</p>
                  <button
                    className="h-10 bg-blue-400 px-2.5  text-xl text-white rounded-md font-bold"
                    onClick={() => setNum(number + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="font-bold flex items-center gap-2">
                Amount to be paid:
                <p className="text-xl text-blue-800">
                  {(product.price * number).toLocaleString() + " CFA"}
                </p>
              </div>
              <div className="flex justify-around w-full">
                <button
                  onClick={() => pay()}
                  className="border-blue-600 border-2 text-blue-600 w-1/3  py-2 px-5   font-bold rounded-full"
                >
                  Buy Now
                </button>
                <button
                  className="bg-blue-600 text-white  py-2 px-5 w-1/3  font-bold rounded-full"
                  onClick={(e) => addToCart(e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Product;
