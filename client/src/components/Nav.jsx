import React, { useEffect, useState } from "react";
import { BsCart, BsChevronDown, BsXSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import accountAvatar from "../assets/account-avatart.png";
import { GetCart, SearchProduct } from "../apiCalls/products";
import Filters from "./Filters";
const Nav = ({ username, showSearch, iterate }) => {
  const [value, setValue] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const searchProduct = async () => {
    try {
      if (value) {
        await SearchProduct(value).then((r) => setSearchResult(r));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [cartNum, setCart] = useState(0);
  const [go, setGo] = useState(false);
  const getCartnum = async () => {
    const response = await GetCart();
    setCart(response.length);
  };
  useEffect(() => {
    getCartnum();
  }, []);
  return (
    <>
      {!searchResult ? (
        <nav className="flex text-blue-800  fixed w-full bg-white z-50 p-4 mb-2 items-center justify-between  capitalize font-semibold">
          <div className="flex items-center justify-between w-1/3">
            <div className="text text-blue-600 font-bold text-3xl ml-4">
              Electronics++
            </div>
            <Link to={"/deals"} className="navlink">
              deals
            </Link>
          </div>
          <div
            className={`w-1/3 ${
              showSearch && "shadow-sm shadow-black"
            } h-8 rounded-full`}
          >
            {showSearch && (
              <>
                <input
                  type="search"
                  placeholder="seach products..."
                  onBlur={() => setGo(false)}
                  onFocus={() => setGo(true)}
                  onChange={(e) => setValue(e.target.value.toLocaleLowerCase())}
                  className="w-3/4 pl-2 text-base font-normal  h-full rounded-s-full"
                />
                <button
                  onClick={() => {
                    searchProduct(value);
                  }}
                  className="w-1/4 bg-blue-600 h-full rounded-e-full text-white  hover:bg-blue-900 font-bold"
                >
                  {go ? "Go" : "search"}
                </button>
              </>
            )}
          </div>
          <div className="flex w-1/4 justify-between items-center   gap-4">
            <Link to={"/wishlist"} className="navlink">
              wishlist
            </Link>
            <Link to={"/cart"} className="flex navlink">
              <small className="bg-red-600 shadow-sm shadow-black text-white font-bold  rounded-full flex items-center justify-center cartnum">
                {iterate ? cartNum + 1 : cartNum}
              </small>
              <div className="flex items-center gap-1">
                <BsCart size={"1.5rem"} />
                cart
              </div>
            </Link>
            <Link
              to={"/profile"}
              className="flex gap-1 navlink items-center justify-center"
            >
              <img src={accountAvatar} className="h-5 w-5 rounded-full" />
              {username ? username : "Account"}
            </Link>
          </div>
        </nav>
      ) : (
        <div className="flex flex-col     h-screen fixed scroll-m-0 w-full z-50 bg-blue-100">
          <nav className="flex text-blue-800  fixed w-full bg-white z-50 p-4 mb-2 items-center justify-between  capitalize font-semibold">
            <div className="flex items-center justify-between w-1/3">
              <div className="text text-blue-600 font-bold text-3xl ml-4">
                Electronics++
              </div>
              <Link to={"/deals"} className="navlink">
                deals
              </Link>
            </div>
            <div
              className={`w-1/3 ${
                showSearch && "shadow-sm shadow-black"
              } h-8 rounded-full`}
            >
              {showSearch && (
                <>
                  <input
                    type="search"
                    onBlur={() => setGo(false)}
                    onFocus={() => setGo(true)}
                    onChange={(e) =>
                      setValue(e.target.value.toLocaleLowerCase())
                    }
                    className="w-3/4 pl-2 text-base font-normal  h-full rounded-s-full"
                  />
                  <button
                    onClick={() => {
                      searchProduct(value);
                    }}
                    className="w-1/4 bg-blue-600 h-full rounded-e-full text-white  hover:bg-blue-900 font-bold"
                  >
                    {go ? "Go" : "search"}
                  </button>
                </>
              )}
            </div>
            <div className="flex w-1/4 justify-between items-center   gap-4">
              <Link to={"/wishlist"} className="navlink">
                wishlist
              </Link>
              <Link to={"/cart"} className="flex navlink">
                <small className="bg-red-600 shadow-sm shadow-black text-white font-bold  rounded-full flex items-center justify-center cartnum">
                  {iterate ? cartNum + 1 : cartNum}
                </small>
                <div className="flex items-center gap-1">
                  <BsCart size={"1.5rem"} />
                  cart
                </div>
              </Link>
              <Link
                to={"/profile"}
                className="flex gap-1 navlink items-center justify-center"
              >
                <img src={accountAvatar} className="h-5 w-5 rounded-full" />
                {username ? username : "Account"}
              </Link>
            </div>
          </nav>
          <div className="mt-10  w-full h-screen relative flex items-center">
            <div
              onClick={() => setSearchResult(null)}
              className="absolute top-20 right-10 cursor-pointer"
            >
              <BsXSquareFill size={"1.8rem"} fill="red" />
            </div>
            <Filters products={searchResult} />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
