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
    <div className="flex flex-col">
      <Nav />
      <section className="pt-20">
        {!list ? (
          <div className="bg-gray-200 text-gray-900 capitalize text-2xl font-bold h-screen">
            no items
          </div>
        ) : (
          <div className="bg-gray-200 grid grid-cols-4">
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
