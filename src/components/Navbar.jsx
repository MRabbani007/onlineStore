import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Components
import DropDownSignin from "./DropDownSignin";
import DropDownCart from "./DropDownCart";
import OffCanvas from "./OffCanvas";
// Imported Data
import { departments } from "../data/departments";
import { fetchCart } from "../data/productServerFunctions";
// Imported Icons
import { RiArrowDownSLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu, IoCartOutline } from "react-icons/io5";
// Imported Media
import logo from "../assets/icons/logo.png";

const Navbar = ({ pageCart }) => {
  // User information
  const [userName, setUserName] = useState("");
  // variables to toggle sidebar and dropdowns
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(() => false);
  const [cartMenu, setCartMenu] = useState(false);
  // Store Cart Info
  const [cart, setCart] = useState([]);
  // Store Search Query and Category
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("all");
  // Page Navigation
  const navigate = useNavigate();
  const location = useLocation();

  const userMenuRef = useRef(null);
  const cartMenuRef = useRef(null);
  const sidebarRef = useRef(null);

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

  // Toggle Sidebar
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  // Toggle User Dropdown
  const handleUserDropDown = () => {
    setUserMenu(!userMenu);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeUserMenue);
    return () => {
      document.removeEventListener("mousedown", closeUserMenue);
    };
  }, []);

  // Toggle Cart Dropdown
  const handleCartDropDown = () => {
    setCartMenu(!cartMenu);
  };
  // Update selected category
  const handleSearchCat = (cat) => {
    setSearchCat(() => cat);
  };
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/store", {
      state: { searchCat: searchCat, searchQuery: searchQuery },
    });
  };

  // Async Function To Load Cart
  const handleLoadCart = async () => {
    await fetchCart("get", userName).then((cartData) => {
      setCart(cartData);
    });
  };

  // TODO: implement signout
  const handleSignOut = () => {
    localStorage.removeItem("sleekUser");
    setUserName("");
  };

  // Set username
  useEffect(() => {
    // if (location.state !== undefined && location.state !== null) {
    //   if (
    //     location.state.username !== undefined &&
    //     location.state.username !== null
    //   ) {
    //     setUserName(location.state.username);
    //   }
    // }
    let data = localStorage.getItem("sleekUser");
    if (!!data) {
      setUserName(JSON.parse(data).username);
    }
  }, []);

  // Load Cart
  useEffect(() => {
    if (userName !== "") {
      handleLoadCart();
    }
  }, [pageCart, userName]);

  // Set Search Input
  useEffect(() => {
    if (location.state !== undefined && location.state !== null) {
      if (
        location.state.searchQuery !== undefined &&
        location.state.searchQuery !== null
      ) {
        setSearchQuery(location.state.searchQuery);
      }
      if (
        location.state.searchCat !== undefined &&
        location.state.searchCat !== null
      ) {
        setSearchCat(location.state.searchCat);
      }
    }
  }, []);

  return (
    <div className="fixed top-0 flex justify-between items-center w-full h-[60px] z-50 bg-slate-950 text-slate-50 px-5">
      <div className="flex items-center">
        <IoMenu
          className="icon-md cursor-pointer shrink-0"
          title="SideNav"
          onClick={handleSidebar}
        />
        <img
          src={logo}
          alt="Sleek Logo"
          onClick={() => navigate("/")}
          className="w-[80px] h-[30px] ml-2 cursor-pointer"
        />
      </div>
      <OffCanvas
        ref={sidebarRef}
        handleSidebar={handleSidebar}
        sidebar={sidebar}
      />
      {/* Search Bar */}
      <form
        onSubmit={(e) => handleSearch(e)}
        className="sm:flex hidden h-full py-3 text-slate-950"
      >
        <select
          className="bg-yellow-500 px-2 rounded-l-md lg:w-[100px] w-[60px] outline-none"
          name="searchCatDropDown"
          id=""
          value={searchCat}
          onChange={(e) => handleSearchCat(e.target.value)}
        >
          <option key="0" value="all">
            All
          </option>
          {departments.map((department, index) => {
            if (department.type === "active") {
              return (
                <option key={index + 1} value={department.value}>
                  {department.text}
                </option>
              );
            } else {
              return (
                <option key={index + 1} value={department.value} disabled>
                  {department.text}
                </option>
              );
            }
          })}
        </select>
        <input
          type="text"
          className="lg:w-[60%] w-[150px] px-2 outline-none"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-500 px-2 rounded-r-md lg:w-[100px] w-[80px]"
        >
          Search
        </button>
      </form>
      <div className="flex justify-between items-center">
        {/* User Dropdown */}
        <div
          className="relative inline-block text-left mr-3"
          id="user-menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span onClick={() => handleUserDropDown()} className="cursor-pointer">
            {userName !== "" && userName}
            <FaRegCircleUser className="icon-md ml-2" />
            <RiArrowDownSLine className="icon-sm" />
          </span>
          <DropDownSignin
            ref={userMenuRef}
            userMenu={userMenu}
            userName={userName}
            handleSignOut={handleSignOut}
          />
        </div>
        {/* Cart Dropdown */}
        <div
          className="relative inline-block text-left mr-3"
          id="cart-menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="cursor-pointer" onClick={() => handleCartDropDown()}>
            <span className="absolute top-[-10px] left-[10px] rounded-full bg-yellow-500 w-[15px] text-center">
              {cart.length ? cart.length : 0}
            </span>
            <IoCartOutline className="icon-md" />
            <RiArrowDownSLine className="icon-sm" />
          </span>
          <DropDownCart ref={cartMenuRef} cart={cart} cartMenu={cartMenu} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
