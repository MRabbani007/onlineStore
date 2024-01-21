import axios from "axios";
import { SERVER_URL } from "./utils";

// Fetch product from server
export const fetchProduct = async (productID) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/products/id`,
      data: { productID: productID },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchCreateProduct = async (product) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/products/create`,
      data: {
        product: product,
      },
    });
    alert(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateProduct = async (product) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/products/update`,
      data: {
        product: product,
      },
    });
    alert(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Fetch Cart from Server
export const fetchCart = async (cartOption, userName, cartData) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/user/cart`,
      data: { cartOption: cartOption, userName: userName, cartData: cartData },
    });
    if (response.data) {
      return response.data.result || [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchOrder = async (orderOption, userName, orderData) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/user/order`,
      data: {
        orderOption: orderOption,
        userName: userName,
        orderData: orderData,
      },
    });
    if (response.data) {
      return response.data.result || [];
    }
  } catch (error) {
    console.log("Error: Fetch Order");
    return [];
  }
};

export const fetchSearch = async (
  searchCat = "",
  searchQuery = "",
  page = 1
) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/products/search`,
      data: {
        searchCat: searchCat,
        searchQuery: searchQuery,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
