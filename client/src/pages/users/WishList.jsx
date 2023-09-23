import React, { useEffect, useState } from "react";
import Nav from "./../../components/Nav";
import ProductCard from "./../../components/ProductCard";
import { GetWishList } from "../../apiCalls/products";
import ProductInWishlist from "../../components/ProductInWishlist";
const WishList = () => {
  const [list, setList] = useState([]);
  const getlist = async () => {
    await GetWishList().then((r) => setList(r.product));
  };
  useEffect(() => {
    getlist();
  }, []);
  return (
    <div className="flex flex-col bg-blue-100">
      <Nav />
      <section className="pt-20">
        {!list ? (
          <div className="bg-blue-100 text-gray-900 capitalize text-2xl font-bold h-screen">
            no items
          </div>
        ) : (
          <div className=" grid grid-cols-4 bg-blue-100 h-full">
            {list.map((el, i) => {
              return <ProductInWishlist key={i} product={el} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default WishList;
