import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsEyeFill, BsPlus, BsSearch, BsXSquareFill } from "react-icons/bs";
import { Avatar } from "../components/Logo";
import { User } from "../components/getuserfromstorage";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../components/CollectFormData";
import { useCookies } from "react-cookie";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["token"]);
  const [showForm, setForm] = useState(false);
  const [owner, setOwner] = useState(User);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    lead_source: "",
    gender: "",
    age: "",
    description: "",
    password: "",
    userOwner: User !== undefined && User.userId.toString(),
  });
  const [allCustomers, setAllCustomers] = useState([]);

  //get
  const getAllcustomers = async (id) => {
    try {
      await axios
        .get(`http://127.0.0.1:5000/customers/${id}`, {
          headers: { authorization: cookies.token },
        })
        .then((res) => {
          setAllCustomers(res.data.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (owner !== undefined) {
      getAllcustomers(owner.userId.toString());
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (owner !== undefined) {
      getAllcustomers(owner.userId.toString());
    } else {
      navigate("/login");
    }
  }, [allCustomers]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://127.0.0.1:5000/register-customer/${User.userId.toString()}`,
          customer
        )
        .then((res) => {
          alert(res.data.message);
          if (res.data.message.includes("created")) {
            setForm(false);
          }
        });
    } catch (error) {}
  };

  //search

  const [searchInput, setSearchInput] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput != "") {
      const filteredData = allCustomers?.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilterResults(filteredData);
    } else {
      setFilterResults(allCustomers);
    }
  };

  return (
    <>
      {showForm && (
        <form
          className="form text-white  w-3/4 sm:w-1/3 sm:right-1/3 right-12 top-1/4  p-4 flex flex-col items-center gap-3"
          encType=""
          autoComplete="off"
        >
          <div
            onClick={() => setForm(false)}
            className="absolute top-3 right-4 cursor-pointer "
          >
            <BsXSquareFill />
          </div>
          <h1 className="capitalize  font-bold text-centr">
            {" "}
            create new customer
          </h1>
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="text"
            placeholder="Firstname"
            name="firstname"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="text"
            placeholder="Lasttname"
            name="lastname"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="text"
            placeholder="email"
            name="email"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="text"
            placeholder="telephone"
            name="telephone"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="number"
            placeholder="Age"
            name="age"
            min={1}
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <select
            onChange={(e) => handleChange(e, customer, setCustomer)}
            name="lead_source"
            placeholder="where did you find us"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 text-blue"
          >
            <option className="text-blue-800">How did you hear about us</option>
            <option className="text-blue-900">Social media</option>
            <option className="text-blue-900">Youtube</option>
            <option className="text-blue-900">Other</option>
          </select>
          <select
            onChange={(e) => handleChange(e, customer, setCustomer)}
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
            onChange={(e) => handleChange(e, customer, setCustomer)}
            placeholder="decription (optional)"
            name="description"
            maxLength={100}
            className="w-full text rounded-md outline-none border-b-2 bg-transparent pl-2 "
          ></textarea>
          <input
            onChange={(e) => handleChange(e, customer, setCustomer)}
            type="text"
            placeholder="image Url (optional)"
            name="imageUrl"
            className="w-full rounded-md outline-none border-b-2 bg-transparent pl-2 "
          />
          <input
            onClick={(e) => onSubmit(e)}
            type="submit"
            value="Create"
            className="w-1/2 cursor-pointer rounded-md outline-none font-semibold  bg-blue-700 shadow-md shadow-black p-1"
          />
        </form>
      )}
      <section
        className={
          !showForm ? "home min-h-screen overflow-auto  text-white" : "hidden"
        }
      >
        <nav className="flex gap-2 sm:justify-between items-center  p-2  fixed top-0 w-full">
          <div
            onClick={() => setForm(true)}
            className="flex  sm:w-32 text-xs new cursor-pointer  gap-1 shadow-black shadow-md sm:font-bold sm:p-2 rounded-md border-2 items-center pr-2"
          >
            <BsPlus size={"1.5rem"} />
            New <div>Customer</div>{" "}
          </div>

          <div className="w-3/4  rounded-full sm:rounded-md h-8 sm:h-10 sm:w-1/2 flex justify-between items-center  shadow-md shadow-black">
            <input
              onChange={(e) => searchItems(e.target.value)}
              autoCorrect="off"
              type="search"
              className="h-full rounded-s-full sm:rounded-s-md w-full outline-none px-2 my-2 text-black  shadow-md shadow-black"
              placeholder="search customer"
            />
            <div className="w-1/5 h-full rounded-e-full bg-blue-700 sm:rounded-e-md cursor-pointer  p-2 flex items-center justify-center">
              <BsSearch size={"1.2rem"} />
            </div>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="flex  relative   flex-col items-center cursor-pointer justify-center  profile"
          >
            <img
              src={Avatar}
              alt="user profile"
              className="sm:h-16 h-8 sm:w-16 w-8 rounded-full shadow-md shadow-black"
            />
            <div className="underline text-xs sm:text-base sm:font-semibold text-blue-300">
              {User?.name.substr(0, 4)}
            </div>
          </div>
        </nav>

        <div className="pt-28 flex flex-col items-center w-full  justify-center">
          <h1 className="sm:text-4xl  font-bold text-center text-blue-300">
            customers ({allCustomers?.length})
          </h1>
          <div className="sm:grid grid-cols-2 w-full place-items-center flex flex-col">
            {searchInput.length < 1 || searchInput === ""
              ? allCustomers?.map((cust, i, allCustomers) => {
                  return (
                    <div
                      key={cust?._id}
                      className="flex  card flex-col items-center gap-2 w-3/4 sm:w-2/3 shadow-md m-10 shadow-black pl-4 pr-2 py-4 rounded-3xl"
                    >
                      <img
                        src={cust?.imageUrl || Avatar}
                        alt={cust?.name}
                        className="h-20 w-20 rounded-full"
                      />
                      <div className="flex gap-1 flex-col w-full">
                        <div className="flex items-center gap-2">
                          name:
                          <strong className="capitalize gap-1 flex items-center">
                            <p>{cust?.firstname}</p>
                            <p> {cust?.lastname}</p>
                          </strong>
                        </div>
                        <p className="flex items-center gap-2">
                          email:
                          <strong className="italic">{cust?.email}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          telephone:
                          <strong className="italic">{cust?.telephone}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          gender:<strong>{cust?.gender}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          age:<strong>{cust?.age}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          created at:
                          <strong className="italic font-light">
                            {cust?.time}
                          </strong>
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          navigate("/customer-profile", {
                            state: { id: cust._id },
                          })
                        }
                        className="view cursor-pointer flex items-center text-blue-600 bg-white px-2 my-2 rounded-full gap-1"
                      >
                        view
                        <BsEyeFill />
                      </div>
                    </div>
                  );
                })
              : ""}
            {searchInput.length >= 1
              ? filterResults.reverse()?.map((cust, i, allCustomers) => {
                  return (
                    <div
                      key={cust?._id}
                      onClick={() => console.log(i)}
                      className="flex  card flex-col items-center gap-2 w-3/4 sm:w-1/3 shadow-md m-10 shadow-black pl-4 pr-2 py-4 rounded-3xl"
                    >
                      <img
                        src={cust?.imageUrl || Avatar}
                        alt={cust?.name}
                        className="h-20 w-20 rounded-full"
                      />
                      <div className="flex gap-1 flex-col w-full">
                        <div className="flex items-center gap-2">
                          name:
                          <strong className="capitalize gap-1 flex items-center">
                            <p>{cust?.firstname}</p>
                            <p> {cust?.lastname}</p>
                          </strong>
                        </div>
                        <p className="flex items-center gap-2">
                          email:
                          <strong className="italic">{cust?.email}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          telephone:
                          <strong className="italic">{cust?.telephone}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          gender:<strong>{cust?.gender}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          age:<strong>{cust?.age}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          created at:
                          <strong className="italic font-light">
                            {cust?.time}
                          </strong>
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          navigate("/customer-profile", {
                            state: { id: cust._id },
                          })
                        }
                        className="view cursor-pointer flex items-center text-blue-600 bg-white px-2 my-2 rounded-full gap-1"
                      >
                        view
                        <BsEyeFill />
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
