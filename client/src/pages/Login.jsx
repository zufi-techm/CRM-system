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
        }, 1500);
      });
  };

  return (
    <section className="bg min-h-screen w-screen text-white flex  items-center flex-col">
      <div className="flex  w-full  justify-between p-4 items-center sm:absolute -top-10">
        <img src={Logo} className="h-20 w-20 sm:h-32 sm:w-40" />
        <Link
          to={"/register"}
          className="border-2 font-bold shadow-md   shadow-blue-950 border-white text-white p-2 px-6 rounded-md"
        >
          Register
        </Link>
      </div>
      <div className="flex w-full bg-blue sm:w-1/3 sm:shadow-lg sm:shadow-black sm:rounded-lg flex-col  items-center mt-16  sm:p-6 sm:pb-8">
        <div className="font-bold mb-4 text-xl">Login to your account</div>
        <img src={reg} className="h-32 w-32 rounded-full" />
        <form
          autoComplete="off"
          encType="multipart/form-data"
          className="flex mt-10 w-full flex-col items-center"
        >
          <p
            style={
              success
                ? { color: "green", fontWeight: "600" }
                : { color: "red", fontWeight: "600" }
            }
          >
            {message}
          </p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e, user, setUser)}
            className="w-3/4 mt-8 rounded-md  pb-2 pl-2 outline-none bg-transparent sm:border-b-4 border-b-2 sm:text-xl"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e, user, setUser)}
            className="w-3/4 rounded-md mt-8  pb-2 pl-2 outline-none bg-transparent sm:border-b-4 border-b-2 sm:text-xl"
          />
          <input
            type="submit"
            value="Login"
            onClick={(e) => onSubmit(e)}
            className="w-1/3 mt-14  sm:mt-4 font-bold shadow-md shadow-blue-950  outline-none bg-white text-blue-950 border-2 p-2 rounded-md "
          />
          <div className="flex items-center gap-2 mt-10 text-xs sm:text-base">
            <p>Already have an account?</p>
            <Link to={"/register"} className="text-blue-500 font-bold p-2">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
