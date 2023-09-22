import React, { useEffect, useState } from "react";
import { BsArrowBarRight, BsArrowRight } from "react-icons/bs";
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
    await GetCategory("laptop").then((response) =>
      setLaptops(response.products)
    );
  };
  const getHeadphones = async () => {
    await GetCategory("headphone").then((response) =>
      setHeadphones(response.products)
    );
  };
  useEffect(() => {
    getLaptops();
    getHeadphones();
  }, []);
  return (
    <section className="bg-blue-100 p-4 mt-6">
      {laptops && (
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
