import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import ProductInCart from "../../components/ProductInCart";
import Nav from "../../components/Nav";
import { GetCart } from "../../apiCalls/products";
import { CheckOut } from "../../apiCalls/checkout";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  let total = 0;
  cart.forEach((element) => {
    total += element?.price;
  });
  const getProducts = async () => {
    const response = await GetCart();
    setCart(response);
  };

  //checkoutif (cart) {

  const pay = async () => {
    try {
      const response = await CheckOut(cart);
    } catch (error) {
      navigate("/pay-cancel");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return total === 0 ? (
    <>
      <Nav />
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center gap-4 flex-col">
        <div className="font-bold">No items in cart</div>
        <div className="w-full  flex items-center justify-center">
          <Link
            to={"/"}
            className=" w-72 bg-blue-800 text-center text-white rounded-full font-bold text-xl p-2 "
          >
            Start shopping
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <Nav />
      <section className="bg-blue-100 pt-20 flex min-h-screen relative">
        <div className="min-w-2/3 grid grid-cols-3 pt-10">
          <div className="fixed z-50 top-14 left-1/4 ml-4 rounded-md font-bold bg-white text-blue-800 w-32 p-2">
            Your Cart ({cart && cart.length})
          </div>
          {cart?.map((element, i) => {
            return <ProductInCart key={i} product={element} />;
          })}
        </div>
        <div className="w-1/3 fixed top-0 bottom-0 right-0 py-10 flex flex-col h-screen  justify-center gap-10 items-center">
          <div className="flex items-center justify-evenly gap-4 font-bold text-2xl">
            Total:
            <div className="text-blue-800 italic">
              {total.toLocaleString() + " CFA"}
            </div>
          </div>
          <button
            onClick={() => pay()}
            className="w-1/2 p-2 bg-blue-800 text-white rounded-full text-xl font-bold"
          >
            Pay
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
