import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Imported Components
// Imported Data
import { fetchSignup } from "../data/userServerFunctions";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // Page Navigation
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (username === "") {
      alert("Enter Username");
    } else {
      if (password === "") {
        alert("Enter Password");
      } else {
        let result = await fetchSignup(username, password, email);
        if (result === null) {
          alert("Server Error");
        } else if (result === "accepted") {
          navigate("/onlineStore/signin", { state: { username: username } });
        }
      }
    }
  };

  return (
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
          <button type="submit" className="bg-yellow-500 rounded-md px-4 py-1">
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center my-2 w-[300px]">
        <span>Already have an account?</span>
        <Link
          to="/onlineStore/signin"
          className="bg-blue-600 text-slate-50 rounded-md px-4 py-1"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
