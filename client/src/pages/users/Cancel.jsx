import React from "react";
import { BsX } from "react-icons/bs";

const Cancel = () => {
  return (
    <div className="h-screen w-screen bg-blue-100 flex items-center justify-center flex-col">
      Payment Cancelled <BsX size={"10rem"} color="red" />
    </div>
  );
};

export default Cancel;
