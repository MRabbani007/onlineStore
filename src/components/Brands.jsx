import React from "react";
// Imported Components
import MyCarousel from "./MyCarousel";
// Imported Data
import { brandsData, LOGO_URL } from "../data/brandData";

const Brands = ({ category }) => {
  let brandsArray = brandsData.filter((item) => item.category === category);
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center items-center">
      <MyCarousel>
        {brandsArray.map((brand, index) => {
          return (
            <img
              src={LOGO_URL + brand.image}
              alt={brand.name}
              key={index}
              className="min-w-[150px] max-w-[150px] h-fit shrink-0"
            />
          );
        })}
      </MyCarousel>
    </div>
  );
};

export default Brands;
