import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { DeleteProduct, GetAllproduct } from "../../apiCalls/products";
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const getAllproducts = async () => {
    try {
      await GetAllproduct().then((response) => setproducts(response));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllproducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await DeleteProduct(id);
      alert("product deleted");
      window.location = window.location;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="flex justify-center items-center flex-col">
      <div className="  flex items-center justify-between self-start py-2 px-20 fixed top-0 w-full bg-white">
        <div className="text text-blue-800 font-bold text-3xl ml-4 ">
          Electronics++
        </div>
        <div className="text text-blue-800 self-center  font-bold text-xl ">
          All products
        </div>
      </div>

      <table className="text-blue-800 mt-20 mb-10  rounded-md  w-3/4 bg-gray-200">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr
                  onClick={(e) => {
                    navigate("/product", { state: { id: product._id } });
                  }}
                  key={product._id}
                  className="cursor-pointer text-center bg-blue-100 hover:bg-blue-800 hover:text-white"
                >
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.createdAt.split("T")[0]}</td>
                  <td
                    onClick={(e) => deleteProduct(product._id)}
                    className="flex h-full w-full items-center justify-center m-0 py-2 hover:bg-red-300 text-white"
                  >
                    <BsTrash3Fill color="red" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Allproducts;
