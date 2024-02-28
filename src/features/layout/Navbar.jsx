import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Context
import { UserContext } from "../../context/UserState";
// Imported Hooks
import useAuth from "../../hooks/useAuth";
// Imported Components
import DropDownSignin from "../../components/DropDownSignin";
import DropDownCart from "../../components/DropDownCart";
import NavbarSearch from "../../components/NavbarSearch";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoCartOutline,
  IoHomeOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine, RiArrowDownSLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
// Imported Media
import logo from "../../assets/icons/logo.png";
import { GlobalContext } from "../../context/GlobalState";
import OffCanvas from "../../components/OffCanvas";

const Navbar = () => {
  const { auth } = useAuth();

  const { cart } = useContext(GlobalContext);

  // variables to toggle sidebar and dropdowns
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(() => false);
  const [cartMenu, setCartMenu] = useState(false);

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
  };

  const userMenuRef = useRef(null);
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
        <NavbarSearch />
        {/* Right Block */}
        <div className="flex justify-between items-center">
          {/* User Dropdown */}
          <div
            className="relative inline-block text-left mr-3"
            id="user-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span
              onClick={() => handleUserDropDown()}
              className="cursor-pointer"
            >
              {auth?.user !== "" && auth?.user}
              <FaRegCircleUser className="icon-md ml-2" />
              <RiArrowDownSLine className="icon-sm" />
            </span>
            <DropDownSignin
              ref={userMenuRef}
              userMenu={userMenu}
              userName={auth?.user}
            />
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
      <OffCanvas
        ref={sidebarRef}
        handleSidebar={handleSidebar}
        sidebar={sidebar}
      />
    </>
  );
};

export default Navbar;
