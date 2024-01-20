import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Imported Components
import Navbar from "../components/Navbar";

const Signin = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("asd123");
  const navigate = useNavigate();

  // TODO: implement signout
  const handleSignOut = () => {
    localStorage.removeItem("sleekUser");
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    if (username !== "" && password !== "") {
      try {
        let response = await axios({
          method: "post",
          url: "http://localhost:3000/signin",
          data: {
            username: username,
            password: password,
          },
        });
        if (response.data === "accepted") {
          localStorage.setItem(
            "sleekUser",
            JSON.stringify({ username: username })
          );
          navigate("/onlineStore/", { state: { username: username } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center pt-[80px]">
        <form action="" className="w-[300px]" onSubmit={(e) => handleSignin(e)}>
          <h1 className="text-3xl font-semibold text-center my-3">Sign In</h1>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="username">UserName</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border-[1px] border-slate-400 outline-none px-3 py-1"
            />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-[1px] border-slate-400 outline-none px-3 py-1"
            />
          </div>
          <div className="flex justify-center items-center my-2">
            <button
              type="submit"
              className="bg-yellow-500 rounded-md px-4 py-1"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex justify-between items-center my-2 w-[300px]">
          <span>Don't have an account?</span>
          <Link
            to="/onlineStore/signup"
            className="bg-blue-600 text-slate-50 rounded-md px-4 py-1"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
