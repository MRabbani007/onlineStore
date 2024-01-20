import React, { useState } from "react";
// Imported Components
import DropDownOptions from "./DropDownOptions";
// Imported Data
import { categoryOptions, starsOptions } from "../data/departments";
// Imported Icons
import { FaPlus, FaMinus } from "react-icons/fa6";

const ProductInfo = ({ productInfo, handleProductInfo }) => {
  const [view, setView] = useState(true);

  return (
    <div className="border-[1px] border-slate-400 h-fit min-w-[300px]">
      <h2 className="bg-slate-400 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Information
      </h2>
      <div className={(view ? "block" : "hidden") + " p-2"}>
        <div className="input-block">
          <label htmlFor="name">Product Name</label>
          <input
            name="name"
            type="text"
            value={productInfo.productName}
            onChange={(e) => handleProductInfo("productName", e.target.value)}
            placeholder="Product Name"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <div className="input-block">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="decimal"
            value={productInfo.price}
            onChange={(e) => handleProductInfo("price", e.target.value)}
            placeholder="Price in cents"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <div className="input-block">
          <label htmlFor="ratingStars">Stars</label>
          <input
            name="ratingStars"
            type="number"
            value={productInfo.stars}
            onChange={(e) => handleProductInfo("stars", e.target.value)}
            placeholder="ratingStars"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <DropDownOptions title="Category" options={categoryOptions} />
        <DropDownOptions title="Stars" options={starsOptions} />
        <div className="input-block">
          <label htmlFor="ratingCount">Ratings</label>
          <input
            name="ratingCount"
            type="number"
            value={productInfo.ratings}
            onChange={(e) => handleProductInfo("ratings", e.target.value)}
            placeholder="ratingCount"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <div className="input-block">
          <label htmlFor="reviewsCount">Reviews</label>
          <input
            name="reviewsCount"
            type="number"
            value={productInfo.reviews}
            onChange={(e) => handleProductInfo("reviews", e.target.value)}
            placeholder="reviewsCount"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <div className="input-block">
          <label htmlFor="brand">Brand</label>
          <input
            name="brand"
            type="text"
            value={productInfo.brand}
            onChange={(e) => handleProductInfo("brand", e.target.value)}
            placeholder="Brand"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
        <div className="input-block">
          <label htmlFor="supplier">Supplier</label>
          <input
            name="supplier"
            type="text"
            value={productInfo.supplier}
            onChange={(e) => handleProductInfo("supplier", e.target.value)}
            placeholder="Supplier"
            className="outline-none border-[1px] border-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
