import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Components
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Paginnation from "../components/Paginnation";
// Imported Data
import { fetchSearch } from "../data/productServerFunctions";
import { ITEMS_PER_PAGE } from "../data/utils";

const Store = () => {
  // Display Products
  const [displayProducts, setDisplayProducts] = useState([]);
  // Display page
  const [page, setPage] = useState(1);
  // Total Count of Products
  const [productCount, setProductCount] = useState(0);
  // Navigation
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (productID) => {
    navigate("/onlineStore/product", { state: { productID: productID } });
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSearch = async () => {
    if (location.state) {
      let searchCat = location.state.searchCat;
      let searchQuery = location.state.searchQuery;
      await fetchSearch(searchCat, searchQuery, page).then(
        ({ products, count }) => {
          setDisplayProducts(products);
          setProductCount(count);
        }
      );
    }
  };

  useEffect(() => {
    handleSearch();
  }, [location, page]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-[80px]">
        <Paginnation
          pages={Math.ceil(productCount / ITEMS_PER_PAGE)}
          activePage={page}
          handlePage={handlePage}
        />
        <div className="flex flex-wrap gap-4 justify-center">
          {displayProducts.length !== 0 &&
            displayProducts.map((product, index) => {
              return (
                <Card
                  product={product}
                  key={crypto.randomUUID()}
                  handleClick={handleClick}
                />
              );
            })}
        </div>
      </div>
      <Paginnation
        pages={Math.ceil(productCount / ITEMS_PER_PAGE)}
        activePage={page}
        handlePage={handlePage}
      />
    </>
  );
};

export default Store;
