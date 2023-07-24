import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import reg from "../assets/register.svg";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { handleChange } from "../components/CollectFormData";
const Register = () => {
  const navigate = useNavigate();
  const [user, Setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [validEm, setValidEm] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validpass, setValidPass] = useState(false);
  const [nameMessage, setNameMess] = useState("");
  const [emailMessage, setEmailMess] = useState("");
  const [passMessage, setPassMess] = useState("");
  useEffect(() => {
    if (user.name === "") {
      setNameMess("name required");
    } else {
      setNameMess("");
      setValidName(true);
    }
    if (user.password.length < 6) {
      setPassMess("password is too short");
    } else {
      setPassMess("");
      setValidPass(true);
    }
    if (!user.email.includes("@" && ".com")) {
      setEmailMess("invalid email");
    } else {
      setEmailMess("");
      setValidEm(true);
    }
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/auth/register", user)
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.message === "account created successfully") {
          setMessage(
            "Account created succesfully, you shall be ridirected to login"
          );
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          return;
        }
      });
  };

  return (
    <section className="bg min-h-screen w-screen text-white flex items-center flex-col">
      <div className="flex  w-full  justify-between p-4 items-center  sm:absolute -top-10">
        <img src={Logo} className="h-20 w-20 sm:h-32 sm:w-40" />
        <Link
          to={"/login"}
          className="border-2 font-bold shadow-md   shadow-blue-950 border-white text-white p-2 px-6 rounded-md"
        >
          Login
        </Link>
      </div>

      <div className="flex w-full bg-blue  sm:w-1/3 sm:shadow-lg sm:shadow-black sm:rounded-lg flex-col  items-center mt-16  sm:p-6 sm:pb-8">
        <div className="font-bold mb-4 text-xl">Create account</div>
        <img src={reg} className="h-32 w-32 rounded-full" />
        <form
          autoComplete="off"
          encType="multipart/form-data"
          className="flex mt-10 w-full flex-col items-center"
        >
          <p
            style={
              success ? { color: "green", fontSize: "12px" } : { color: "red" }
            }
          >
            {message}
          </p>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(event) => handleChange(event, user, Setuser)}
            className="w-3/4 rounded-md  pb-2 pl-2 outline-none bg-transparent sm:border-b-4 border-b-2 sm:text-xl"
          />
          <p className="text-xs font-light text-left text-red-600 pb-1">
            {nameMessage}
          </p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event, user, Setuser)}
            className="w-3/4 rounded-md mt-8  pb-2 pl-2 outline-none bg-transparent sm:border-b-4 border-b-2 sm:text-xl"
          />
          <p className="text-xs font-light text-left text-red-600 pt-1 pb-1">
            {emailMessage}
          </p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event, user, Setuser)}
            className="w-3/4 rounded-md mt-8  pb-2 pl-2 outline-none bg-transparent sm:border-b-4 border-b-2 sm:text-xl"
          />
          <p className="text-xs font-light text-left text-red-600 pt-1">
            {passMessage}
          </p>
          <input
            disabled={validEm && validpass && validName ? false : true}
            type="submit"
            value="Register"
            onClick={(e) => onSubmit(e)}
            className="w-1/3   submit mt-16 sm:mt-4 font-bold shadow-md shadow-blue-950  outline-none bg-white text-blue-950 border-2 p-2 rounded-md "
          />

          <div className="flex gap-2 items-center mt-6 text-xs sm:text-base">
            <p>Already have an account?</p>
            <Link to={"/login"} className="text-blue-500 font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
