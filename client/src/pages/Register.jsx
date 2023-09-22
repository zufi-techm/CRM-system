import React, { useEffect, useState } from "react";
import reg_img from "../assets/register.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterUser } from "../apiCalls/users";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const onSubmit = async (e, values) => {
    try {
      e.preventDefault();
      const response = await RegisterUser(values);
      setMessage(response.message);
      setSuccess(response.success);
      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="bg flex items-center justify-center">
      <form
        onSubmit={(e) => onSubmit(e, { name, email, phone, address, password })}
        action=""
        className="bg-white w-1/3 formreg flex flex-col items-center justify-between p-4 px-8 shadow-md shadow-black rounded-sm"
      >
        <img src={reg_img} className="h-32 w-32 rounded-full" />
        <h2 className="font-bold text-blue-800 text-2xl">Register</h2>
        <p
          className={`text-xs font-semibold ${
            success ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
        <div className="flex flex-col gap-3 w-full">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="name"
            className="border-b-2 text-gray-900 m-2 font-semibold border-gray-500 w-full px-2  pb-1"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="email"
            className="border-b-2  text-gray-900 m-2 font-semibold border-gray-500 w-full px-2  pb-1"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
            placeholder="Address"
            className="border-b-2  text-gray-900 m-2 font-semibold border-gray-500 w-full px-2  pb-1"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            name="phone"
            placeholder="phone"
            className="border-b-2 text-gray-900 m-2 font-semibold border-gray-500 w-full px-2  pb-1"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            className="border-b-2 text-gray-900 m-2 font-semibold border-gray-500 w-full px-2  pb-1"
          />
        </div>
        <button className="btn  w-1/2 p-2 font-bold">Register</button>
        <div className="text-xs font-semibold">
          Already have and account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
