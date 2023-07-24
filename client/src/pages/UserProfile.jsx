import React, { useEffect, useState } from "react";
import { Avatar } from "../components/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  BsArrowLeft,
  BsArrowLeftSquareFill,
  BsPenFill,
  BsTrash,
  BsXSquare,
  BsXSquareFill,
} from "react-icons/bs";
import { User } from "../components/getuserfromstorage";
import { handleChange } from "../components/CollectFormData";
const UserProfile = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [owner, setOwner] = useState(User);
  const clearUserData = () => {
    setCookie("token", null);
    window.localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const [userData, setUserData] = useState();
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showuPdatePage, setUpdatepage] = useState(false);
  const [showDeletePage, setDeletePage] = useState(false);
  useEffect(() => {
    const getuserProfile = async (id) => {
      try {
        await axios
          .get(`http://127.0.0.1:5000/user/profile/${id}`, {
            headers: { authorization: cookies.token },
          })
          .then((res) => setUserData(res.data));
      } catch (error) {
        navigate("/login");
      }
    };

    if (owner !== undefined) {
      getuserProfile(owner.userId.toString());
    } else {
      navigate("/");
    }
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://127.0.0.1:5000/user/delete-user/${userData?._id}`)
      .then((res) => {
        if (res.data.message.includes("deleted")) {
          alert(res.data.message);
          clearUserData();
        }
      });
  };
  return (
    <section className="blue">
      {showDeletePage && (
        <section className="absolute  bg-transparent sm:w-1/3 z-50 w-full p-10 sm:p-0  h-screen sm:left-1/3  flex flex-col  text-xl gap-2 items-center text-white justify-center">
          <h2 className="font-bold">Delete Account</h2>
          <form
            autoComplete="off"
            className="flex relative flex-col w-3/4 mt-4 sm:shadow-md sm:shadow-black bg-blue-950 justify-between items-center rounded-md p-5 h-40"
          >
            <div>Your account will be permanently deleted</div>
            <div
              onClick={() => setDeletePage(false)}
              className="absolute cursor-pointer top-2 right-2 "
            >
              <BsXSquareFill />
            </div>
            <input
              onClick={(e) => onDelete(e)}
              type="submit"
              value={"Delete"}
              className="px-2 cursor-pointer py-1 w-1/2 font-semibold text-white rounded-md bg-red-600"
            />
          </form>
        </section>
      )}

      {showuPdatePage && (
        <section className="absolute  bg-transparent sm:w-1/3 z-50 w-full p-10 sm:p-0  h-screen sm:left-1/3  flex flex-col  text-2xl gap-4 items-center text-white justify-center">
          <h2 className="font-bold">Edit profile</h2>
          <form
            autoComplete="off"
            className="flex relative flex-col w-96 mt-4 sm:shadow-md sm:shadow-black sm:bg-blue-950 justify-between items-center rounded-md p-10 h-80"
          >
            <div
              onClick={() => setUpdatepage(false)}
              className="absolute cursor-pointer top-2 right-2"
            >
              <BsXSquareFill />
            </div>
            <div className="flex sm:gap-2  items-center justify-center px-4">
              <label htmlFor="name" className="capitalize font-bold">
                name:
              </label>
              <input
                onChange={(e) => handleChange(e, newData, setNewData)}
                type="text"
                id="name"
                className="bg-transparent outline-none border-b-2 sm:ml-2 m-1  pl-2 w-60 sm:w-"
                name="name"
              />
            </div>
            <div className="flex sm:gap-2 items-center justify-center">
              <label htmlFor="email" className="capitalize font-bold">
                email:
              </label>
              <input
                onChange={(e) => handleChange(e, newData, setNewData)}
                type="text"
                id="email"
                className="bg-transparent outline-none border-b-2   pl-2 w-60 sm:w-"
                name="email"
              />
            </div>
            <div className="flex sm:gap-2 items-center justify-center ">
              <label htmlFor="password" className="capitalize font-bold">
                password:
              </label>
              <input
                onChange={(e) => handleChange(e, newData, setNewData)}
                type="password"
                id="password"
                className="bg-transparent outline-none border-b-2   pl-2  w-60 sm:w-"
                name="password"
              />
            </div>
            {/* <input onClick={(e)=>onUpdate(e)} type='submit' value={"Update"} className='px-2 py-1 w-1/2 font-semi-bold text-blue-950 rounded-md bg-white'/> */}
          </form>
        </section>
      )}

      <div
        className={
          showuPdatePage || showDeletePage
            ? "bg-blue-950 flex flex-col gap-10 items-center justify-center min-h-screen text-white w-full  opacity-20 blur-sm  "
            : "blue flex flex-col gap-10 items-center justify-center min-h-screen text-white w-full "
        }
      >
        <h1 className="text-3xl absolute sm:top-2  top-0 capitalize font-bold">
          your profile
        </h1>
        <img
          src={Avatar}
          alt="your profie"
          className="h-40 w-40 rounded-full"
        />
        <div>
          <p>
            id:<strong className="underline ml-2">{userData?._id}</strong>
          </p>
          <p>
            name:<strong className="underline ml-2">{userData?.name}</strong>
          </p>
          <p>
            email:<strong className="underline ml-2">{userData?.email}</strong>
          </p>
        </div>
        <div className="flex justify-between sm:justify-center sm:gap-16 w-full px-10 items-center">
          <a
            href="/"
            className="flex items-center underline text-blue-500 p-2 rounded-md gap-1"
          >
            go to home{" "}
          </a>
          <button
            onClick={() => clearUserData()}
            className="flex items-center bg-white text-blue-600 p-2 rounded-md gap-1"
          >
            <BsArrowLeft color="blue" />
            logout{" "}
          </button>
        </div>
        <div className="flex flex-col  gap-4 w-full px-10 items-center">
          <button
            onClick={() => setDeletePage(true)}
            className="flex items-center bg-red-600 p-2 rounded-md gap-1"
          >
            delete account
            <BsTrash color="white" />{" "}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
