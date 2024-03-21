import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Hooks
import useAuth from "../../hooks/useAuth";
import useGlobal from "../../hooks/useGlobal";
// Imported Components
import DropDownSignin from "../navigation/DropDownSignin";
import DropDownCart from "../navigation/DropDownCart";
import DropDownAdmin from "../navigation/DropDownAdmin";
import NavbarSearch from "../../components/NavbarSearch";
// Imported Icons;
import { IoCartOutline, IoMenu, IoSearchOutline } from "react-icons/io5";
import { RiAdminLine, RiArrowDownSLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
// Imported Media
import logo from "../../assets/icons/logo.png";
import OffCanvas from "../navigation/OffCanvas";

const Navbar = () => {
  const { auth } = useAuth();
  const { cart } = useGlobal();

  // variables to toggle sidebar and dropdowns
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);

  const [viewSearch, setViewSearch] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);

  // Page Navigation
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle Cart Dropdown
  const handleCartDropDown = () => {
    setCartMenu(!cartMenu);
  };
  // Toggle Sidebar
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  // Toggle User Dropdown
  const handleUserDropDown = () => {
    setUserMenu(!userMenu);
  };

  const handleAdminDropDown = () => {
    setAdminMenu(!adminMenu);
  };

  const closeUserMenue = (e) => {
    if (!userMenuRef.current.contains(e.target)) {
      setUserMenu(false);
    }
    if (!cartMenuRef.current.contains(e.target)) {
      setCartMenu(false);
    }
    if (!sidebarRef.current.contains(e.target)) {
      setSidebar(false);
    }
    if (!adminMenuRef.current.contains(e.target)) {
      setAdminMenu(false);
    }
  };

  const userMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const cartMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", closeUserMenue);
    return () => {
      document.removeEventListener("mousedown", closeUserMenue);
    };
  }, []);

  return (
    <>
      <menu className="navbar text-zinc-300 border-none bg-zinc-950">
        {/* Left Block */}
        <div className=" flex justify-between items-center h-full flex-nowrap pl-4 rounded-l-lg gap-2 bg-zinc-950">
          <IoMenu
            className="menu-icon"
            title="SideNav"
            onClick={handleSidebar}
          />
          <Link to="/" className="">
            <img
              src={logo}
              alt="Sleek Logo"
              className="w-[80px] h-[30px] cursor-pointer"
            />
          </Link>
        </div>

        {/* Middle Search Bar */}
        <div
          className={
            (expandSearch ? " flex-1  " : " invisible opacity-0 w-0 ") +
            " sm:inline-block hidden duration-300 mx-auto  h-full"
          }
        >
          <NavbarSearch />
        </div>

        {/* Right Block */}
        <div className="flex justify-between items-center rounded-r-lg bg-zinc-950 pl-2 h-full">
          <IoSearchOutline
            className="menu-icon sm:inline hidden "
            onClick={() => {
              setExpandSearch(!expandSearch);
            }}
          />
          <IoSearchOutline
            className="sm:hidden menu-icon"
            onClick={() => {
              setViewSearch(!viewSearch);
            }}
          />
          {/* User Dropdown */}
          <div
            className="relative inline-block text-left mx-3"
            id="user-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {auth?.roles.includes(5150) ? (
              <span
                onClick={handleAdminDropDown}
                className="cursor-pointer hover:text-slate-50 duration-300"
              >
                {auth?.user !== "" && auth?.user}
                <RiAdminLine className="icon ml-2" />
                <RiArrowDownSLine className="icon-md" />
              </span>
            ) : (
              <span
                onClick={() => handleUserDropDown()}
                className="cursor-pointer hover:text-slate-50 duration-300"
              >
                {auth?.user !== "" && auth?.user}
                <FaRegCircleUser className="icon ml-2" />
                <RiArrowDownSLine className="icon-md" />
              </span>
            )}
            <DropDownSignin
              ref={userMenuRef}
              userMenu={userMenu}
              userName={auth?.user}
            />
            <DropDownAdmin viewMenu={adminMenu} ref={adminMenuRef} />
          </div>
          {/* Cart Dropdown */}
          <div
            className="relative inline-block text-left mr-3 cursor-pointer group"
            id="cart-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => handleCartDropDown()}
          >
            <span className="absolute bottom-[20px] right-[23px] rounded-full bg-yellow-400 group-hover:bg-yellow-300 duration-300 text-zinc-800 w-7 h-7 flex items-center justify-center">
              {cart?.length ? cart.length : 0}
            </span>
            <IoCartOutline className="icon-lg w-8 group-hover:text-slate-50 duration-300" />
            <RiArrowDownSLine className="icon-md group-hover:text-slate-50 duration-300" />
            <DropDownCart ref={cartMenuRef} cartMenu={cartMenu} />
          </div>
        </div>
      </menu>
      <div
        className={
          viewSearch
            ? " sm:hidden fixed top-[50px] left-0 right-0 h-[50px] "
            : " hidden " + " duration-200 z-[40000]"
        }
      >
        <NavbarSearch />
      </div>
      <OffCanvas
        ref={sidebarRef}
        handleSidebar={handleSidebar}
        sidebar={sidebar}
      />
    </>
  );
};

export default Navbar;
