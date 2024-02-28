import { useContext, useState } from "react";
import { departments } from "../data/departments";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { IoSearchOutline } from "react-icons/io5";

const NavbarSearch = () => {
  const { handleSearchSubmit } = useContext(GlobalContext);
  // Store Search Query and Category
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("all");

  const navigate = useNavigate();

  // Update selected category
  const handleSearchCat = (cat) => {
    setSearchCat(() => cat);
  };

  // Handle search
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(searchQuery, searchCat);
    console.log("first");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:flex items-stretch justify-center hidden flex-1 h-full py-2 text-slate-950"
    >
      <select
        className="bg-yellow-500 hover:text-slate-100 duration-300 cursor-pointer px-2 lg:w-[100px] w-[60px] rounded-l-md outline-none"
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
        className="lg:w-[60%] w-[150px] px-2 border-0 outline-none"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-yellow-500 px-5 rounded-r-md">
        <IoSearchOutline className="icon-md hover:text-slate-100 duration-300 cursor-pointer" />
      </button>
    </form>
  );
};

export default NavbarSearch;
