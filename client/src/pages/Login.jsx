<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import reg_img from "../assets/register.svg";
import { Link, useNavigate } from "react-router-dom";
=======
import React, { useState } from "react";
import bg from "../assets/bg.jpg";
import reg from "../assets/register.svg";
import Logo from "../components/Logo";
import { Await, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../components/CollectFormData";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [_, setCookie] = useCookies();
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/auth/login", user)
      .then(async (res) => {
        if (res.data.message) {
          setMessage("incorrect email or password");
          return;
        }
        setMessage("Login successful");
        setSuccess(true);
        setCookie("token", res?.data?.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify({ userId: res?.data?.userId, name: res?.data?.name })
        );
        setTimeout(() => {
          navigate("/profile");
        }, 100);
      });
  };
>>>>>>> 2136f94be219d36cbab6561cf9bf30a6fea4bf9f

import { LoginUser } from "../apiCalls/users";
const Login = (v) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const onSubmit = async (e, values) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const response = await LoginUser(values);
      setMessage(response.message);
      setSuccess(response.success);
      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/home");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setMessage(error.message);
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
        onSubmit={(e) => onSubmit(e, { email, password })}
        action=""
        className="bg-white w-1/3 form flex flex-col items-center justify-between p-4 px-8 shadow-md shadow-black rounded-sm"
      >
        <img src={reg_img} className="h-32 w-32 rounded-full" />
        <h2 className="font-bold text-blue-800 text-2xl">
          Login to start shopping
        </h2>
        <p
          className={`text-xs font-semibold ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
        <div className="flex flex-col gap-2 w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="email"
            className="border-b-2  text-gray-900 font-semibold border-gray-500 w-full px-2 m-2 pb-1"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            className="border-b-2 text-gray-900 font-semibold border-gray-500 w-full px-2 m-2 pb-1"
          />
        </div>
        <button className="btn  w-1/2 p-2 font-bold">Login</button>
        <div className="text-xs font-semibold">
          Do not have and account?{" "}
          <Link to={"/register"} className="text-blue-600">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
