import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductPreview = ({
  productInfo,
  properties,
  arrayProperties,
  values,
  details,
  about,
}) => {
  const [view, setView] = useState(true);
  return (
    <div className="border-[1px] border-slate-400 h-fit min-w-[300px]">
      <h2 className="bg-slate-400 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Preview
      </h2>
      <div className={(view ? "block" : "hidden") + " p-2"}>
        <h3>{productInfo.productName}</h3>
        <p>{productInfo.price !== "" && "Price: " + productInfo.price}</p>
        <p>{productInfo.stars !== "" && "Stars: " + productInfo.stars}</p>
        <p>{productInfo.ratings !== "" && "Ratings: " + productInfo.ratings}</p>
        <p>{productInfo.reviews !== "" && "Reviews: " + productInfo.reviews}</p>
        <p>{productInfo.brand !== "" && "Brand: " + productInfo.brand}</p>
        <p>
          {productInfo.supplier !== "" && "Supplier: " + productInfo.supplier}
        </p>

        <h3>Properties</h3>
        <ul>
          {values.map((value, index) => {
            return (
              <li key={index}>
                {properties[index]}: {JSON.stringify(value)}
              </li>
            );
          })}
          {arrayProperties.map((property, index) => {
            return (
              <li key={index}>
                {property.prop}:{JSON.stringify(property.value)}
              </li>
            );
          })}
        </ul>
        <h3>Details</h3>
        <ul>
          {details.map((item, index) => {
            return (
              <li key={index} className="flex items-center justify-between">
                <span>
                  {item.name}: {item.value}
                </span>
                <FaTimes
                  className="btn-remove"
                  // onClick={() => deleteDetail(index)}
                />
              </li>
            );
          })}
        </ul>
        <h3>About</h3>
        <ul>
          {about.length !== 0 &&
            about.map((item, index) => {
              return (
                <li
                  key={index}
                  // onClick={() => deleteAbout(index)}
                  className="flex justify-between items-center"
                >
                  {item}
                  <FaTimes className="btn-remove" />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ProductPreview;
