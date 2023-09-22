import React from "react";
import { BsCheck } from "react-icons/bs";

const Success = () => {
  return (
    <div className="h-screen w-screen bg-blue-100 flex items-center justify-center flex-col">
      Payment Success <BsCheck size={"10rem"} color="blue" />
    </div>
  );
};

export default Success;
