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
      <nav className="navbar px-5 duration-500 z-50 bg-zinc-950 text-zinc-300">
        {/* Left Block */}
        <span className="flex items-center">
          <IoMenu
            className="icon-md cursor-pointer shrink-0"
            title="SideNav"
            onClick={handleSidebar}
          />
          <Link to="/">
            <img
              src={logo}
              alt="Sleek Logo"
              className="w-[80px] h-[30px] ml-2 cursor-pointer"
            />
          </Link>
        </span>
        {/* Middle Search Bar */}
        <div className="hidden sm:block">
          <NavbarSearch />
        </div>

        {/* Right Block */}
        <div className="flex justify-between items-center">
          <IoSearchOutline
            className="sm:hidden icon-md"
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
              <span onClick={handleAdminDropDown}>
                {auth?.user !== "" && auth?.user}
                <RiAdminLine className="icon-md ml-2" />
                <RiArrowDownSLine className="icon-sm" />
              </span>
            ) : (
              <span
                onClick={() => handleUserDropDown()}
                className="cursor-pointer"
              >
                {auth?.user !== "" && auth?.user}
                <FaRegCircleUser className="icon-md ml-2" />
                <RiArrowDownSLine className="icon-sm" />
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
            className="relative inline-block text-left mr-3"
            id="cart-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span
              className="cursor-pointer"
              onClick={() => handleCartDropDown()}
            >
              <span className="absolute top-[-10px] left-[10px] rounded-full bg-yellow-500 w-[15px] text-center">
                {cart?.length ? cart.length : 0}
              </span>
              <IoCartOutline className="icon-md" />
              <RiArrowDownSLine className="icon-sm" />
            </span>
            <DropDownCart ref={cartMenuRef} cartMenu={cartMenu} />
          </div>
        </div>
      </nav>
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
