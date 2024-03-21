import React, { createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { ACTIONS, SERVER } from "../data/actions";

// Initial state
const initialState = {
  id: "",
  username: "",
  firstname: "",
  lastname: "",
  roles: [],
  createDate: "",
  lastSignin: "",
  email: "",
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }) => {
  // Store userName
  const [user, setUser] = useState(initialState);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleEditName = async (firstname = "", lastname = "") => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_NAME,
          payload: { username: auth?.user, firstname, lastname },
        },
      });
      if (response.data.status === "success") {
        alert(firstname + lastname);
        setUser((prev) => {
          return { ...prev, firstname, lastname };
        });
      }
    } catch (error) {}
  };

  const handleEditEmail = async (email = "") => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_EMAIL,
          payload: { username: auth?.user, email },
        },
      });
      if (response.data.status === "success") {
        setUser((prev) => {
          return { ...prev, email };
        });
      }
    } catch (error) {
      console.log("Error: Edit Email");
    }
  };

  const handleGetUserSettings = async () => {
    let response = await axiosPrivate.post(SERVER.USER_GET_SETTINGS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.USER_GET_SETTINGS,
        payload: { username: auth?.user },
      },
    });
    if (response?.data) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    if (auth?.user && auth?.roles) {
      handleGetUserSettings();
    }
  }, [auth?.user]);

  return (
    <UserContext.Provider
      value={{
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        handleEditName,
        handleEditEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
