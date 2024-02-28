import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Components
import Card from "../components/Card";
import Paginnation from "../components/Paginnation";
// Imported Data
import { GlobalContext } from "../context/GlobalState";
import SkeletonContentPage from "../skeletons/SkeletonStorePage";

const Store = () => {
  const { displayProducts, loadingStore } = useContext(GlobalContext);
  // Navigation
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <Paginnation />
        {loadingStore ? (
          <SkeletonContentPage />
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {displayProducts.length !== 0 &&
              displayProducts.map((product, index) => {
                return <Card product={product} key={crypto.randomUUID()} />;
              })}
          </div>
        )}
      </div>
      <Paginnation />
    </>
  );
};

export default Store;
