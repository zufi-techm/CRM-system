import React, { useEffect, useState } from "react";
import {
  BsArrowBarRight,
  BsArrowDownCircle,
  BsArrowRight,
  BsHddNetwork,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { GetCategory } from "../apiCalls/products";
import ProtectedPage from "./ProtectedPage";

const Suggestions = () => {
  const [laptops, setLaptops] = useState([]);
  const [headphones, setHeadphones] = useState([]);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();

  const onclick = (id) => {
    navigate("/product", { state: { id } });
  };

  const getLaptops = async () => {
    try {
      await GetCategory("laptop").then(
        (response) => response.products && setLaptops(response.products)
      );
    } catch (error) {
      setLaptops(undefined);
    }
  };
  const getHeadphones = async () => {
    try {
      await GetCategory("headphone").then((response) =>
        setHeadphones(response.products)
      );
    } catch (error) {
      setLaptops(undefined);
    }
  };
  useEffect(() => {
    getLaptops();
    getHeadphones();
    console.log(laptops, headphones);
  }, []);

  return (
    <section className="bg-blue-100 p-4 mt-6">
      {laptops ? (
        <>
          <div className="font-black text-3xl capitalize text-blue-800 m-2 my-5 p-2">
            laptops for you!
          </div>
          <section className="grid grid-cols-4">
            {laptops?.reverse().map((laptop) => {
              return (
                <ProductCard
                  key={laptop._id}
                  product={laptop}
                  onclick={() => onclick(laptop?._id)}
                />
              );
            })}
          </section>
        </>
      ) : (
        <div className="h-screen z-50 flex justify-center font-bold text-blue-600 items-center gap-4 flex-col text-2xl bg-blue-100 fixed w-full top-0 left-0 right-0 bottom-0">
          Network Error
          <button
            className="bg-blue-600 text-white p-2 text-xl  w-36 rounded-full"
            onClick={() => {
              window.location = window.location;
            }}
          >
            Retry
          </button>
        </div>
      )}

      {headphones && (
        <>
          <div className="font-black text-3xl capitalize text-blue-800 m-2 my-5 p-2">
            headphones for you!
          </div>
          <section className="grid grid-cols-4">
            {headphones?.map((headphone) => {
              return (
                <ProductCard
                  key={headphone._id}
                  product={headphone}
                  onclick={() => onclick(headphone?._id)}
                />
              );
            })}
          </section>
        </>
      )}
    </section>
  );
};

export default Suggestions;
