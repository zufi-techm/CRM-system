import React, { useState } from "react";
import { Createproduct } from "../../apiCalls/products";

const CreateNewProduct = () => {
  const [product, setProduct] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await Createproduct(product);
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center bg-blue-100 h-screen">
      <form
        onSubmit={(e) => onsubmit(e)}
        onChange={(e) => handleChange(e)}
        className="flex flex-col text-white  bg-blue-800 w-1/3 items-center p-4 gap-2 shadow-md shadow-black"
      >
        <h1 className=" mb-4 font-bold text-xl">New produst</h1>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        />
        <input
          type="number"
          name="price"
          min="1"
          placeholder="price"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        />
        <select
          name="category"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
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
          name="brand"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        >
          <option>brand</option>
          <option value={"apple"}>apple</option>
          <option value={"lenovo"}>lenovo</option>
          <option value={"dell"}>dell</option>
          <option value={"samsung"}>samsung</option>
          <option value={"asus"}>asus</option>
          <option value={"hp"}>HP</option>
          <option value={"alienware"}>alienware</option>
        </select>
        <select
          name="color"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        >
          <option>color</option>
          <option value={"white"}>white</option>
          <option value={"black"}>black</option>
          <option value={"red"}>red</option>
          <option value={"grey"}>grey</option>
          <option value={"purple"}>purple</option>
          <option value={"blue"}>blue</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="description"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        />
        <input
          type="text"
          name="image"
          placeholder="image Url"
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2 h-8 pl-2"
        />
        <textarea
          className="w-full lowercase bg-blue-800 shadow-sm shadow-white rounded-md m-2  pl-2 h-20"
          name="properties"
          cols="30"
          rows="10"
          placeholder="properties seperated by -"
        ></textarea>
        <button className="btn w-1/2 font-bold">create</button>
      </form>
    </div>
  );
};

export default CreateNewProduct;
