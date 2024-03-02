import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
// Imported Data
import { departments } from "../../data/departments";
// Imported Hooks
import useGlobal from "../../hooks/useGlobal";
// Imported Icons
import { IoClose, IoSettings } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
// Imported Media
import flag from "../../assets/flags/flag-kz.png";
import logo from "../../assets/icons/logo.png";
import useAuth from "../../hooks/useAuth";

const OffCanvas = forwardRef(({ sidebar, handleSidebar }, ref) => {
  const { auth } = useAuth();
  const { handleSearchSubmit } = useGlobal();

  const handleDepartment = (dep) => {
    handleSidebar();
    handleSearchSubmit("", dep);
  };

  const [expandDep, setExpandDep] = useState(true);
  const [expandSettings, setExpandSettings] = useState(false);

  return (
    <div
      ref={ref}
      className={
        (sidebar ? " left-0 " : " left-[-100%] ") +
        " fixed top-0 h-screen w-[300px] bg-slate-300 text-slate-950 flex flex-col z-40 pt-[0px] duration-500"
      }
    >
      <div className="flex justify-between py-2 px-2 bg-slate-950 text-slate-50">
        <img src={logo} alt="" className="w-[100px]" />
        <button onClick={handleSidebar} className="">
          <IoClose className="icon-md" />
        </button>
      </div>
      <div className="px-3">
        <h1 className="">
          <span>Hello</span>
          {auth?.user === "" ? (
            <Link to="login" className="text-sky-700">
              , Sign In
            </Link>
          ) : (
            " " + auth.user + ","
          )}
        </h1>
        <h2 className="cursor-pointer" onClick={() => setExpandDep(!expandDep)}>
          Shop by department
          <IoMdArrowDropright
            className={
              (expandDep ? "rotate-90 " : "") + " icon-md duration-200"
            }
          />
        </h2>
        <ul
          className={(expandDep ? " " : " hidden h-0") + " px-3 duration-200 "}
        >
          {departments.map((dep, index) => {
            return (
              <li
                key={index}
                className={
                  dep.type === "active"
                    ? "text-slate-950 my-1 cursor-pointer"
                    : "text-slate-500 my-1"
                }
                onClick={() => {
                  if (dep.type === "active") {
                    handleDepartment(dep.value);
                  }
                }}
              >
                {dep.text}
              </li>
            );
          })}
        </ul>
        <h2
          className="cursor-pointer"
          onClick={() => setExpandSettings(!expandSettings)}
        >
          Help & Settings
          <IoMdArrowDropright
            className={
              (expandSettings ? "rotate-90 " : "") + " icon-md duration-200"
            }
          />
        </h2>
        <div
          className={
            (expandSettings ? " " : " hidden h-0") + " px-3 duration-200"
          }
        >
          <Link
            to="settings"
            className="block text-gray-700 px-4 py-2 cursor-pointer"
          >
            <img src={flag} alt="Kazakhstan" className="icon-lg mr-2" />
            <span>Kazakhstan</span>
          </Link>
          <Link
            to="settings"
            className="block text-gray-700 px-4 py-2 cursor-pointer"
          >
            <IoSettings className="icon mr-2" />
            <span>Settings</span>
          </Link>
          <span className="block text-gray-700 px-4 py-2 cursor-pointer">
            <BiSupport className="icon mr-2" />
            <span>Customer Service</span>
          </span>
        </div>
        <div className="flex my-2">
          <Link
            to="register"
            className="bg-slate-500 text-slate-50 rounded-md mx-2 py-2 px-4"
          >
            Signup
          </Link>
          <Link
            to="login"
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
