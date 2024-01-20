import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Imported Components
import Navbar from "../components/Navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // TODO: handle navigation
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (username !== "" && password !== "") {
      try {
        let response = await axios({
          method: "post",
          url: "http://localhost:3000/signup",
          data: {
            username: username,
            password: password,
            email: email,
          },
        });
        console.log(response.data);
        if (response.data === "accepted") {
          // navigate("/", { state: { username: username } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center pt-[80px]">
        <form action="" className="w-[300px]" onSubmit={(e) => handleSignUp(e)}>
          <h1 className="text-3xl font-semibold text-center my-3">Sign Up</h1>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="border-[1px] border-slate-400 outline-none px-3 py-1"
            />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="username">UserName</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              className="border-[1px] border-slate-400 outline-none px-3 py-1"
            />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="border-[1px] border-slate-400 outline-none px-3 py-1"
            />
          </div>
          <div className="flex justify-center items-center my-2">
            <button
              type="submit"
              className="bg-yellow-500 rounded-md px-4 py-1"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex justify-between items-center my-2 w-[300px]">
          <span>Already have an account?</span>
          <Link
            to="/signin"
            className="bg-blue-600 text-slate-50 rounded-md px-4 py-1"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
