import React, { useEffect, useState } from "react";
import { Avatar } from "../components/Logo";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
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
const CustomerProfile = () => {
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["token"]);
  const [owner, setOwner] = useState(User !== undefined && User.userId);
  const location = useLocation();
  const [id, setId] = useState(location.state ? location.state.id : undefined);
  const [custData, setCustData] = useState({});
  const [newData, setNewData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    lead_source: "",
    gender: "",
    age: "",
    description: "",
    imageUrl: "",
    userOwner: owner,
  });
  const [showuPdatePage, setUpdatepage] = useState(false);
  const [showDeletePage, setDeletePage] = useState(false);

  const [updateMessage, setUpdateMessage] = useState("");
  const [deletMessage, setDeleteMessage] = useState("");

  //get
  const getCustomerProfile = async (cust_id) => {
    try {
      axios
        .get(`http://127.0.0.1:5000/customer-profile/${cust_id}`, {
          headers: { authorization: cookies.token },
        })
        .then((res) => setCustData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      getCustomerProfile(id);
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (id !== undefined) {
      getCustomerProfile(id);
    } else {
      navigate("/");
    }
  }, [custData]);

  const onUpdate = async (e) => {
    try {
      e.preventDefault();
      await axios
        .put(
          `http://127.0.0.1:5000/update-customer/${(custData?._id).toString()}`,
          newData
        )
        .then((res) => {
          setUpdateMessage(res.data.message);
          setTimeout(() => {
            setUpdatepage(false);
          }, 5000);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {}
  };
  const onDelete = async (e) => {
    try {
      e.preventDefault();
      await axios
        .delete(`http://127.0.0.1:5000/customer-profile/${custData?._id}`)
        .then((res) => {
          setDeleteMessage(res.data.message);
          if (res.data.message.includes("delete")) {
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="blue relative">
      {showDeletePage && (
        <section className="absolute  bg-transparent sm:w-1/3 z-50 w-full p-10 sm:p-0  h-screen sm:left-1/3  flex flex-col  text-xl gap-2 items-center text-white justify-center">
          <h2 className="font-bold">Delete Account</h2>
          <form
            autoComplete="off"
            className="flex relative flex-col w-3/4 mt-4 sm:shadow-md sm:shadow-black bg-blue-950 justify-between items-center rounded-md p-5 h-40"
          >
            <p className="text-sm text-green">{deletMessage}</p>
            <div>Customer will be permanently deleted deleted</div>
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
        <section className="z-50 w-full text-sm p-10 sm:p-0  min-h-screen fixed  flex flex-col   sm:text-base gap-4 items-center text-white justify-center">
          <h2 className="font-bold">Edit customer profile</h2>
          <form
            autoComplete="off"
            className="flex gap-2 relative flex-col w-96 mt-4 sm:shadow-md sm:shadow-black sm:bg-blue-950 justify-between items-center rounded-md p-10 "
          >
            <p className="text-green-600 font-semibold">{updateMessage}</p>
            <div
              onClick={() => setUpdatepage(false)}
              className="absolute top-3 right-4 cursor-pointer "
            >
              <BsXSquareFill />
            </div>
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="text"
              placeholder="Firstname"
              name="firstname"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
            />
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="text"
              placeholder="Lasttname"
              name="lastname"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
            />
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="text"
              placeholder="email"
              name="email"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
            />
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="text"
              placeholder="telephone"
              name="telephone"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
            />
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="number"
              placeholder="Age"
              name="age"
              min={1}
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
            />
            <select
              onChange={(e) => handleChange(e, newData, setNewData)}
              name="lead_source"
              placeholder="where did you find us"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 text-blue"
            >
              <option className="text-blue-800">
                How did you hear about us
              </option>
              <option className="text-blue-900">Social media</option>
              <option className="text-blue-900">Youtube</option>
              <option className="text-blue-900">Other</option>
            </select>
            <select
              onChange={(e) => handleChange(e, newData, setNewData)}
              name="gender"
              placeholder="where did you find us"
              className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 text-blue"
            >
              <option className="text-blue-800">Gender</option>
              <option className="text-blue-900">male</option>
              <option className="text-blue-900">female</option>
              <option className="text-blue-900">Other</option>
            </select>
            <textarea
              onChange={(e) => handleChange(e, newData, setNewData)}
              placeholder="decription (optional)"
              name="description"
              maxLength={100}
              className="w-full text rounded-md outline-none border-b-2 bg-transparent pl-2 "
            ></textarea>
            <input
              onChange={(e) => handleChange(e, newData, setNewData)}
              type="text"
              placeholder="image Url (optional)"
              name="imageUrl"
              className="w-full rounded-md outline-none m-1 border-b-2 bg-transparent pl-2 "
            />
            <input
              onClick={(e) => onUpdate(e)}
              type="submit"
              value="Update"
              className="w-1/2 cursor-pointer rounded-md outline-none font-semibold  bg-blue-700 shadow-md shadow-black mt-4 px-2 py-1"
            />
          </form>
        </section>
      )}

      {custData ? (
        <div
          className={
            showuPdatePage || showDeletePage
              ? "bg-blue-950 flex flex-col gap-10 sm:gap-4 items-center justify-center min-h-screen text-white w-full  opacity-5 blur-sm  "
              : "blue flex flex-col gap-10 sm:gap-4 items-center justify-center  text-white w-full "
          }
        >
          <h1 className="text-3xl absolute   top-4 capitalize font-bold">
            customer profile
          </h1>
          <img
            src={custData?.imageUrl || Avatar}
            alt="customer profie"
            className="h-40 w-40 rounded-full mt-20 sm:mt-16"
          />
          <div>
            <p>
              id:
              <strong className="underline text-cyan-300 ml-2">
                {custData?._id}
              </strong>
            </p>
            <p>
              Firstname:
              <strong className=" text-cyan-300 ml-2">
                {custData?.firstname}
              </strong>
            </p>
            <p>
              Lastname:
              <strong className=" text-cyan-300 ml-2">
                {custData?.lastname}
              </strong>
            </p>
            <p>
              email:
              <strong className="italic text-cyan-300 ml-2">
                {custData?.email}
              </strong>
            </p>
            <p>
              telephone:
              <strong className="italic text-cyan-300 ml-2">
                {custData?.telephone}
              </strong>
            </p>
            <p>
              age:
              <strong className="underline text-cyan-300 ml-2">
                {custData?.age}
              </strong>
            </p>
            <p>
              gender:
              <strong className=" text-cyan-300 ml-2">
                {custData?.gender}
              </strong>
            </p>
            <p>
              lead source:
              <strong className=" text-cyan-300 ml-2">
                {custData?.lead_source}
              </strong>
            </p>
            <p>
              description:
              <strong className="font-normal text-cyan-300 ml-2">
                {custData?.description}
              </strong>
            </p>
            <p>
              Created at:
              <strong className="italic text-cyan-300 ml-2">
                {custData?.time}
              </strong>
            </p>
          </div>
          <div className="flex justify-center  w-full  items-center">
            <a
              href="/"
              className="flex items-center underline text-blue-500 p-2  rounded-md gap-1"
            >
              go to home{" "}
            </a>
          </div>
          <div className="flex justify-center gap-4 w-full px-10 items-center">
            <button
              onClick={() => setUpdatepage(true)}
              className="flex items-center text-xs  border-2 border-white p-2 rounded-md gap-1"
            >
              edit profile <BsPenFill />{" "}
            </button>
            <button
              onClick={() => setDeletePage(true)}
              className="flex items-center text-xs bg-red-600 p-2 rounded-md gap-1"
            >
              delete customer
              <BsTrash color="white" />{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default CustomerProfile;
