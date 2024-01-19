import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import kzFlag from "../../images/flags/flag-kz.png";
import usFlag from "../../images/flags/flag-usa.png";
import { forwardRef } from "react";

const DropDownSignin = forwardRef(
  ({ userMenu, userName, handleSignOut }, ref) => {
    useEffect(() => {
      // console.log(userMenu);
    }, [userMenu]);

    return (
      <div
        ref={ref}
        className={`${
          userMenu
            ? "absolute visible translate-y-0 opacity-100"
            : "absolute invisible translate-y-[-20px] opacity-0"
        }  right-0 z-10 mt-2 w-40 rounded-md origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none duration-300`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {userName === "" ? (
          <Link
            to="/signin"
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
          to="/signup"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-1"
          className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
        >
          Signup
        </Link>
        <Link
          to="/orders"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-2"
          className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
        >
          Orders & Returns
        </Link>
        <Link
          to="/storeapi"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-200"
          className="text-gray-700 block px-4 py-2 text-sm border-b-[1px] cursor-pointer hover:bg-slate-300"
        >
          Create Product
        </Link>
        <Link
          to="/settings"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-3"
          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-300"
        >
          <img src={kzFlag} alt="" className="inline w-[20px] mr-2" />
          Kazakhstan
        </Link>
        <Link
          to="/settings"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-4"
          className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
        >
          <img src={usFlag} alt="" className="inline w-[20px] mr-2" />
          EN-US
        </Link>
        <Link
          to="/settings"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-4"
          className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
        >
          <FaDollarSign className="inline text-xl mr-2" />
          US-Dollar
        </Link>
        <Link
          to="/settings"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-4"
          className="text-gray-700 block px-4 py-2 text-sm rounded-b-md cursor-pointer hover:bg-slate-300"
        >
          <IoSettings className="inline text-xl mr-2" /> Settings
        </Link>
      </div>
    );
  }
);

export default DropDownSignin;
