import React, { useEffect, useState } from "react";
import { BsCart, BsChevronDown } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import accountAvatar from "../assets/account-avatart.png";
import s1 from "../assets/s1.webp";
import s2 from "../assets/s2.webp";
import s3 from "../assets/es2.png";
import Nav from "./Nav";
const Header = ({ username, showSearch }) => {
  const navigate = useNavigate();
  const images = [
    {
      src: "https://i.ebayimg.com/thumbs/images/g/jHMAAOSwpJRdwzg8/s-l960.webp",
      header: "Affordable iphones",
      text: "Buy iphones at low price",
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

  let i = 1;
  useEffect(() => {
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
  return (
    <>
      <div className="pb-10 mb-10">
        <Nav username={username} showSearch={true} />
      </div>
      <header className="w-full pt-4 mt- flex  flex-col">
        <div className="relative  h-72  flex justify-end">
          <img
            src={img.src}
            className={`h-full pl-10 pr-10  ${img.header ? "w-2/3" : "w-full"}`}
          />
          <div
            className={`text-white ${
              !img.header ? "hidden" : "block"
            } bg-purple-800  flex flex-col h-full  justify-around p-4 absolute  top-0 left-10`}
          >
            <div className="flex gap-2 flex-col">
              <h1 className="text-4xl font-extrabold ">{img.header}</h1>
              <p className="text-xl italic font-bold">{img.text}</p>
            </div>
            <button
              onClick={() =>
                navigate("/product", {
                  state: { id: "650a1b9e830530476d5f6f8b" },
                })
              }
              className="text-xl font-bold text-white btn bg-black py-2 rounded-full hover:bg-gray-950 shadow-sm w-1/2 shadow-black"
            >
              shop now
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
