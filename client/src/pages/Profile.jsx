import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import accountAvater from "../assets/account-avatart.png";
import { BsArrowRight, BsArrowRightSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  const getUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.user);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-evenly bg-blue-100">
      <nav className="flex  fixed top-0 w-full bg-white z-50 p-4 mb-2 items-center justify-between text-gray-900 capitalize font-semibold">
        <div className="flex items-center justify-between w-1/3">
          <div className="text text-blue-800 font-bold text-2xl">
            Electronics++
          </div>
        </div>
      </nav>
      <div className="W-32 bg-white p-2 absolute top-14 text-blue-800 font-bold right-1/2 rounded-md">
        Your Profile
      </div>
      <div className="flex flex-col justify- gap-2 ">
        <img src={accountAvater} className="h-32 w-32" />
        <div className="flex items-center text-xl gap-2">
          name:<p className="font-bold text-blue-800">{user.name}</p>
        </div>
        <div className="flex items-center text-xl gap-2">
          email:<p className="font-bold text-blue-800">{user.email}</p>
        </div>
        <div className="flex items-center text-xl gap-2">
          role:<p className="font-bold text-blue-800">{user.role}</p>
        </div>
        <div className="flex items-center text-xl gap-2">
          items in cart:
          <p className="font-bold text-blue-800">
            {user.cart ? user.cart.length : 0}
          </p>
        </div>
        <div className="flex items-center text-xl gap-2">
          items in wishlist:
          <p className="font-bold text-blue-800">
            {user.wishlist ? user.wishlist.length : 0}
          </p>
        </div>
        <button
          onClick={() => logout()}
          className="w-20 h-10 self-center mt-4 rounded-md bg-red-600 text-white font-bold flex items-center justify-center"
        >
          logout <BsArrowRight fill="white" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
