import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Filters from "./Filters";
import Suggestions from "./Suggestions";
import { GetBrand, GetCategory } from "../apiCalls/products";
const ProtectedPage = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  const [filterResult, setFilterResult] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [filtered, setFiltered] = useState(false);

  const handleFilterCat = async (value) => {
    await GetCategory(value).then((response) => {
      if (response.products.length > 0) {
        setFilterResult(response.products);
      } else {
        setFilterResult("none");
      }
    });
  };
  const handleFilterBrand = async (value) => {
    await GetBrand(value, value).then((response) => {
      if (response.products.length > 0) {
        setFilterResult(response.products);
      } else {
        setFilterResult("none");
      }
    });
  };
  const search = async () => {
    try {
    } catch (error) {
      console.log(error.messsage);
    }
  };
  return (
    <section>
      {user && (
        <div>
          <Header
            username={user.name.split(" ")[0]}
            cartNum={user?.cart?.length}
            showSearch={true}
          />

          <div className="h-10  font-bold mt-6  flex items-center justify-between px-4 ">
            <select
              onChange={(e) => handleFilterCat(e.target.value)}
              name="category"
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full text-white bg-blue-800"
            >
              <option>category</option>
              <option value={"tv"}>tv</option>
              <option value={"phone"}>phone</option>
              <option value={"laptop"}>laptop</option>
              <option value={"headphone"}>headphone</option>
              <option value={"already-used"}>already used</option>
              <option value={"game"}>game</option>
            </select>
            <select
              onChange={(e) => handleFilterBrand(e.target.value)}
              name=""
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              <option>Brand</option>
              <option value={"hp"}>HP</option>
              <option value={"lenovo"}>Lenovo</option>
              <option value={"apple"}>Apple</option>
              <option value={"dell"}>Dell</option>
              <option value={"samsung"}>Samsung</option>
              <option value={"itel"}>Itel</option>
              <option value={"google pixel"}>Google pixel</option>
              <option value={"asus"}>Asus</option>
              <option value={"alienware"}>Alienware</option>
              <option value={"lg"}>LG</option>
              <option value={"sony"}>Sony</option>
            </select>

            <div
              onClick={(e) => handleFilterCat("already-used")}
              className=" px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              already used
            </div>
            <div
              onClick={() => handleFilterCat("phone")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              phones
            </div>
            <div
              onClick={() => handleFilterCat("headphone")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              Headphones
            </div>
            <div
              onClick={() => handleFilterCat("game")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-800 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              Controllers
            </div>
          </div>
          {children}
        </div>
      )}
      {filterResult !== null ? (
        <Filters
          products={filterResult === "none" ? undefined : filterResult}
        />
      ) : (
        <Suggestions />
      )}
    </section>
  );
};

export default ProtectedPage;
