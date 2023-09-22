import React from "react";
import { BsApple } from "react-icons/bs";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const Filters = ({ products }) => {
  const navigate = useNavigate();
  const onclick = (id) => {
    navigate("/product", { state: { id } });
  };
  return (
    <section className="bg-blue-100 p-4 mt-4 text-center">
      {!products ? (
        <div className="text-2xl font-bold">No products</div>
      ) : (
        <div className="grid grid-cols-4">
          {products?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                onclick={() => onclick(product?._id)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Filters;
