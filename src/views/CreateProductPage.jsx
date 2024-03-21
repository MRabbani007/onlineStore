import { useContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
// Imported Context
// Imported Hooks
// Imported Components
import SectionHeader from "../features/createProduct/SectionHeader";
import CardCategory from "../features/createProduct/CardCategory";
import SectionPriceShipping from "../features/createProduct/SectionPriceShipping";
import SectionEditPageHeader from "../features/createProduct/SectionEditPageHeader";
import SectionImages from "../features/createProduct/SectionImages";
import SectionDisplayImages from "../features/createProduct/SectionDisplayImages";
import SectionProductProperties from "../features/createProduct/SectionProductProperties";
import SectionProductDetails from "../features/createProduct/SectionProductDetails";
import { ProductProvider } from "../context/ProductProvider";
// Imported Data

const CreateProductPage = () => {
  const location = useLocation();

  return (
    <div className="">
      {/* Page Header */}
      <SectionEditPageHeader />
      <section className="flex lg:flex-nowrap flex-wrap gap-5 text-slate-950">
        {/* Left Column: images */}
        <SectionDisplayImages />
        {/* Middle Column: Product info */}
        <div className="md:flex-1 w-full border-[1px]">
          {/* Product Header */}
          <SectionHeader />
          {/* Price & Shipping */}
          <div className="flex justify-between px-2 py-1">
            <SectionPriceShipping />
            <CardCategory />
          </div>
          {/* Product Body */}
          <div className="">
            <h2 className="text-2xl font-semibold px-2">Product Details</h2>
            {/* Properties */}
            <SectionProductProperties />
            {/* Images */}
            <SectionImages />
            {/* Details */}
            <SectionProductDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProductPage;
