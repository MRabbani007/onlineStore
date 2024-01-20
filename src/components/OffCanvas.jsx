import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
// Imported Data
import { departments } from "../data/departments";
// Imported Icons
import { IoClose } from "react-icons/io5";
// Imported Media
import flag from "../assets/flags/flag-kz.png";
import logo from "../assets/icons/logo.png";

const OffCanvas = forwardRef(({ sidebar, handleSidebar }, ref) => {
  return (
    <div
      ref={ref}
      className={
        sidebar
          ? "fixed top-0 left-0 h-screen w-[300px] bg-slate-300 text-slate-950 flex flex-col z-10 pt-[0px] duration-500"
          : "fixed top-0 left-[-100%] h-screen w-[300px] bg-slate-300 text-slate-950 flex flex-col z-10 pt-[0px] duration-500"
      }
    >
      <div className="flex justify-between py-4 px-2 bg-slate-950 text-slate-50">
        <img src={logo} alt="" className="w-[100px]" />
        <button onClick={handleSidebar} className="">
          <IoClose className="icon-md" />
        </button>
      </div>
      <div className="px-3">
        <h1 className="font-bold text-xl my-2">Hello, Sign In</h1>
        <ul className="px-3">
          {departments.map((dep, index) => {
            return (
              <li
                key={index}
                className={
                  dep.type === "active"
                    ? "text-slate-950 my-1 cursor-pointer"
                    : "text-slate-500 my-1"
                }
              >
                <Link
                  to={{
                    pathname: "/store",
                    state: { searchCat: dep.value, searchQuery: "" },
                    search: dep.value,
                  }}
                >
                  {dep.text}
                </Link>
              </li>
            );
          })}
        </ul>
        <h1 className="font-bold text-xl my-2">Help & Settings</h1>
        <div className="flex justify-start items-center">
          <img src={flag} alt="Kazakhstan" className="icon-lg mx-2" />
          <span>Kazakhstan</span>
        </div>
        <h1 className="font-bold text-xl my-2">Customer Service</h1>
        <div className="flex">
          <Link
            to="/signup"
            className="bg-slate-500 text-slate-50 rounded-md mx-2 py-2 px-4"
          >
            Signup
          </Link>
          <Link
            to="/signin"
            className="bg-yellow-500 text-slate-950 rounded-md mx-2 py-2 px-4"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
});

export default OffCanvas;
