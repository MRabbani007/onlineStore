import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
// Imported Icons
import { IoSettings } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
// Imported Media
import kzFlag from "../assets/flags/flag-kz.png";
import usFlag from "../assets/flags/flag-usa.png";
import useLogout from "../hooks/useLogout";

const DropDownSignin = forwardRef(({ userMenu, userName }, ref) => {
  const logout = useLogout();
  const handleSignOut = () => {
    logout();
  };
  return (
    <div
      ref={ref}
      className={
        (userMenu
          ? " visible translate-y-0 opacity-100"
          : " invisible translate-y-[-20px] opacity-0") +
        " absolute right-0 z-10 mt-2 w-40 rounded-md origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none duration-300"
      }
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      {userName === "" ? (
        <Link
          to="login"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-0"
          className="text-gray-700 block px-4 py-2 text-sm rounded-t-md cursor-pointer hover:bg-slate-300"
        >
          Signin
        </Link>
      ) : (
        <div
          role="menuitem"
          tabIndex="-1"
          id="menu-item-0"
          onClick={handleSignOut}
          className="text-gray-700 block px-4 py-2 text-sm rounded-t-md cursor-pointer hover:bg-slate-300"
        >
          Signout
        </div>
      )}
      <Link
        to="register"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-1"
        className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
      >
        Signup
      </Link>
      <Link
        to="orders"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-2"
        className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
      >
        Orders & Returns
      </Link>
      <Link
        to="storeapi"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-200"
        className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
      >
        Create Product
      </Link>
      <Link
        to="settings"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-3"
        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-300"
      >
        <img src={kzFlag} alt="" className="inline w-[20px] mr-2" />
        Kazakhstan
      </Link>
      <Link
        to="settings"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-4"
        className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
      >
        <img src={usFlag} alt="" className="inline w-[20px] mr-2" />
        EN-US
      </Link>
      <Link
        to="settings"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-4"
        className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
      >
        <FaDollarSign className="inline text-xl mr-2" />
        US-Dollar
      </Link>
      <Link
        to="settings"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-4"
        className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
      >
        <IoSettings className="inline text-xl mr-2" /> Settings
      </Link>
    </div>
  );
});

export default DropDownSignin;
