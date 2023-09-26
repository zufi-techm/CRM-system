import React, { useEffect, useState } from "react";
import { BsCart, BsChevronDown } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import s1 from "../../assets/s1.webp";
import s2 from "../../assets/s2.webp";
import s3 from "../../assets/es2.png";
import accountAvatar from "../../assets/account-avatart.png";
import Filters from "../../components/Filters";
import Suggestions from "../../components/Suggestions";
import { GetBrand, GetCategory } from "../../apiCalls/products";

const Home = ({ children }) => {
  const images = [
    {
      src: s1,
      header: "Affordable accessories",
      text: "Buy affordable accessories at a discount",
    },
    {
      src: s2,
      header: "Video games",
      text: "We provide new video Games at low cost",
    },
    {
      src: s3,
    },
  ];
  const [img, setImg] = useState({
    src: images[0].src,
    header: images[0].header,
    text: images[0].text,
  });
  const navigate = useNavigate();
  let i = 1;
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/home");
    }
    setInterval(() => {
      setImg(images[i++]);
      if (i > images.length) {
        setImg(images[0]);
      }
      if (i < 0) {
        setImg(images[images.length]);
      }
    }, 10000);
  }, []);

  const [filterResult, setFilterResult] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [user, _] = useState(false);
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

  const [go, setGo] = useState(false);

  return (
    <section>
      <>
        <div>
          <nav className="flex   fixed w-full bg-white z-50 p-4 mb-2 items-center justify-between text-blue-800  capitalize font-semibold">
            <div className="flex items-center justify-between w-1/3">
              <div className="text text-blue-800  font-bold text-3xl ml-4 logo">
                Electronics++
              </div>
              <Link to={"/login"} className="navlink">
                deals
              </Link>
            </div>
            <div className="w-1/3 shadow-sm shadow-black h-8 rounded-full">
              <input
                type="search"
                onBlur={() => setGo(false)}
                onFocus={() => setGo(true)}
                className="w-3/4 pl-2 text-base font-normal  h-full rounded-s-full"
              />
              <button
                onClick={() => navigate("/login")}
                className="w-1/4 bg-blue-800 h-full rounded-e-full text-white  hover:bg-blue-900 font-bold"
              >
                {go ? "Go" : "search"}
              </button>
            </div>
            <div className="flex w-1/4 justify-between items-center   gap-4">
              <Link to={"/login"} className="navlink">
                wishlist
              </Link>
              <Link to={"/login"} className="flex navlink">
                <small className="bg-red-600 shadow-sm shadow-black text-white font-bold  rounded-full flex items-center justify-center cartnum">
                  0
                </small>
                <div className="flex items-center gap-1">
                  <BsCart size={"1.5rem"} />
                  cart
                </div>
              </Link>
              <Link
                to={"/login"}
                className="flex gap-1 navlink items-center justify-center"
              >
                <img src={accountAvatar} className="h-5 w-5 rounded-full" />
                Account
              </Link>
            </div>
          </nav>
        </div>
        <header className="w-full pt-4 mt- flex  flex-col">
          <div className="relative  h-72  flex justify-end">
            <img
              src={img.src}
              className={`h-full pl-10 pr-10  ${
                img.header ? "w-2/3" : "w-full"
              }`}
            />
            <div
              className={`text-blue-800  ${
                !img.header ? "hidden" : "block"
              } bg-lime-300  flex flex-col h-full  justify-around p-4 absolute  top-0 left-10`}
            >
              <div className="flex gap-2 flex-col">
                <h1 className="text-4xl font-extrabold ">{img.header}</h1>
                <p className="text-xl italic font-bold">{img.text}</p>
              </div>
              <button className="text-xl font-bold text-white btn bg-black py-2 rounded-full hover:bg-gray-950 shadow-sm w-1/2 shadow-black">
                shop now
              </button>
            </div>
          </div>
        </header>
      </>
      {!user && (
        <div>
          <div className="h-10 mt-6 font-bold  flex items-center justify-between px-4 ">
            <select
              onChange={(e) => handleFilterCat(e.target.value)}
              name="category"
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full text-white bg-blue-800"
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
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
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
              className=" px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              already used
            </div>
            <div
              onClick={() => handleFilterCat("phone")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              phones
            </div>
            <div
              onClick={() => handleFilterCat("headphone")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
            >
              Headphones
            </div>
            <div
              onClick={() => handleFilterCat("game")}
              className="w-28 px-2 p-1 cursor-pointer text-center hover:bg-blue-900 hover:shadow-black shadow-sm rounded-full bg-blue-800 text-white"
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

export default Home;
