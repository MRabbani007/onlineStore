import axios from "axios";
// Imported Data
// import { SERVER_URL } from "./utils";

const SERVER_URL = "";

export const fetchSignin = async (username, password) => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/signin`,
      data: {
        username: username,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: Signin");
    return null;
  }
};

export const fetchSignup = async (username, password, email = "") => {
  try {
    let response = await axios({
      method: "post",
      url: `${SERVER_URL}/signup`,
      data: {
        username: username,
        password: password,
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: Signup");
    return null;
  }
};
