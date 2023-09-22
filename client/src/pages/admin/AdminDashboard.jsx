import React, { useEffect, useState } from "react";
import { BsEyeFill, BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GetAllUsers } from "../../apiCalls/users";
import { GetAllproduct } from "../../apiCalls/products";

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const allProd = async () => {
    await GetAllproduct().then((r) => setProducts(r.length));
  };
  const allUsers = async () => {
    await GetAllUsers().then((r) => setUsers(r.length));
  };
  useEffect(() => {
    allUsers();
    allProd();
  });
  return (
    <section className="h-screen flex justify-center items-center flex-col">
      <div className=" w-1/2 flex items-center justify-between self-start py-4">
        <div className="text text-blue-800 font-bold text-3xl ml-4">
          Electronics++
        </div>
        <div className="text text-blue-800 font-bold text-xl ">Dashboard</div>
      </div>
      <div className="h-5/6 rounded-md p-4 w-3/4 bg-gray-200 grid grid-cols-2 place-items-center">
        <div className="w-3/4 text-2xl flex items-center flex-col justify-around rounded-md p-4  font-bold text-white h-3/4 m-2 bg-purple-600">
          <Link
            to={"/create-new-product"}
            className="hover:underline flex items-center gap-2"
          >
            New Product
            <BsPlusCircleFill />
          </Link>
          <Link
            to={"/profile"}
            className="hover:underline flex items-center gap-2"
          >
            View profile
            <BsEyeFill />
          </Link>
        </div>
        <Link
          to={"/all-users"}
          className="w-3/4 flex flex-col justify-between items-center rounded-md p-4 text-xl font-bold text-white h-3/4 bg-blue-500"
        >
          <div className="self-start">Users</div>
          <div className="text-3xl justify-center">{users}</div>
        </Link>
        <Link
          to={"/all-products"}
          className="w-3/4 flex flex-col justify-between items-center rounded-md p-4 text-xl font-bold text-white h-3/4 bg-green-600"
        >
          <div className="self-start">Products</div>
          <div className="text-3xl justify-center">{products}</div>
        </Link>
        <Link
          to={"/all-orders"}
          className="w-3/4 flex flex-col justify-between items-center rounded-md p-4 text-xl font-bold text-white h-3/4 bg-pink-600"
        >
          <div className="self-start">Orders</div>
          <div className="text-3xl justify-center">{0}</div>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
