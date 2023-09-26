import { axiosInstance } from "./axiosInstance";
export const Createproduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/create-product",
      payload
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const Getproduct = async (value) => {
  try {
    const response = await axiosInstance.get(
      `http://127.0.0.1:5000/api/products/${value}`
    );
    return response.data;
  } catch (error) {
    if (error.message) {
      return;
    }
  }
};
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `http://127.0.0.1:5000/api/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const GetAllproduct = async () => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:5000/api/products/"
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const GetCategory = async (value) => {
  try {
    const response = await axiosInstance.get(
      `http://127.0.0.1:5000/api/products/category/${value}`
    );
    return response.data;
  } catch (error) {
    if (error.message) {
      return;
    }
  }
};
export const GetBrand = async (value) => {
  try {
    const response = await axiosInstance.get(
      `http://127.0.0.1:5000/api/products/brand/${value}`
    );
    return response.data;
  } catch (error) {
    if (error.message) {
      return;
    }
  }
};

export const Addtocart = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/add-to-cart",
      payload
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const RemoveFromcart = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/remove-from-cart",
      payload
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const GetCart = async () => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:5000/api/products/cart"
    );
    return response.data;
  } catch (error) {
    if (error.message) {
      return;
    }
  }
};
export const Addtowishlist = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/add-to-wishlist",
      payload
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const RemoveFromWishlist = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/remove-from-cart",
      payload
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const GetWishList = async () => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:5000/api/products/wishlist"
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const SearchProduct = async (search) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:5000/api/products/search",
      {
        search,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
