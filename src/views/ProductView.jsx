import React, { useEffect, useState } from "react";
import {
  compileProperties,
  compileAllProperties,
  genRatings,
  getProductImages,
  getProductPrice,
  findVariant,
  findPropertyValue,
  variantContains,
  parseImageColor,
  getSelectProperties,
} from "../data/productFunctions";
import { fetchProduct, fetchCart } from "../data/productServerFunctions";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ProductView = () => {
  // Store Index of Variant
  const [variant, setVariant] = useState(0);
  const [productProperties, setProductProperties] = useState([]);
  const [productPropertyValues, setProductPropertValues] = useState([]);

  const handleVariant = (property, propertyValue) => {
    setVariant(findVariant(product, variant, property, propertyValue));
    addproperty(property, propertyValue);
  };

  return (
    <>
      <Navbar pageCart={cart} />
      <div className="w-full min-h-screen pt-[80px] text-slate-950 flex md:flex-nowrap flex-wrap px-5 gap-5">
        {product.length === 0 ? null : (
          <>
            {/* Left Column: images */}
            <div className="md:w-[30%] w-full flex">
              <div className="mr-4">
                {productImages.length !== 0 &&
                  productImages.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={imageURL + image}
                        className="w-[60px] h-auto object-fill p-2 my-1 border-[1px] rounded-md"
                        onMouseOver={() => handleThumbHover(index)}
                      />
                    );
                  })}
              </div>
              <div className="w-[200px] ">
                {mainImage && <img src={imageURL + mainImage} alt="" />}
              </div>
            </div>
            {/* Middle Column: Product info */}
            <div className="md:flex-1 w-full border-[1px]">
              <header className="bg-slate-200 p-3">
                <div className="font-semibold text-2xl">
                  {product.length !== 0 && product.name}
                </div>
                <div>Visit the {product.length !== 0 && product.supplier}</div>
                <div className="flex justify-between items-center">
                  <div className="text-yellow-500 text-2xl flex items-center">
                    <span className="text-slate-950 mr-2">
                      {product.length && product.rating.stars}
                    </span>
                    {stars.length !== 0 &&
                      stars.map((star, index) => {
                        return star === "f" ? (
                          <IoStar key={index} />
                        ) : star === "h" ? (
                          <IoStarHalf key={index} />
                        ) : (
                          <IoStarOutline key={index} />
                        );
                      })}
                  </div>
                  <div>
                    <span>
                      {product.length !== 0 && product.rating.count} Ratings,{" "}
                    </span>
                    <span>
                      {product.length !== 0 && product.reviews} Reviews
                    </span>
                  </div>
                </div>
              </header>
              <div className="p-3">
                <div className="">
                  <span className="text-2xl">{"$" + priceWhole}</span>
                  <span className="align-super">{priceFraction}</span>
                </div>
                <div>Ships to Kazakhstan</div>
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <div>
                  {productProperties.length &&
                    productProperties.map((property, index) => {
                      return (
                        <div key={index}>
                          {property === "image" ? (
                            ""
                          ) : (
                            <h3 className="text-slate-950 text-xl font-semibold my-2 ml-2">
                              {property}
                            </h3>
                          )}
                          {property === "size" || property === "style"
                            ? productPropertyValues.length &&
                              productPropertyValues[index].values.map(
                                (value, idx) => {
                                  if (
                                    variantContains(
                                      product,
                                      variant,
                                      property,
                                      value
                                    )
                                  ) {
                                    if (isSelected(value)) {
                                      return (
                                        <div
                                          key={idx}
                                          className="inline-block mx-2 my-1 border-[2px] border-red-500 p-1 cursor-pointer"
                                          onClick={() =>
                                            handleVariant(property, value)
                                          }
                                        >
                                          {value}
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div
                                          key={idx}
                                          className="inline-block mx-2 my-1 border-[2px] border-yellow-500 p-1 cursor-pointer"
                                          onClick={() =>
                                            handleVariant(property, value)
                                          }
                                        >
                                          {value}
                                        </div>
                                      );
                                    }
                                  } else {
                                    return (
                                      <div
                                        key={idx}
                                        className="inline-block mx-2 my-1 border-[1px] p-1"
                                        onClick={() =>
                                          handleVariant(property, value)
                                        }
                                      >
                                        {value}
                                      </div>
                                    );
                                  }
                                }
                              )
                            : property === "color"
                            ? ""
                            : property === "image" &&
                              productPropertyValues.length &&
                              productPropertyValues[index].values.map(
                                (value, idx) => {
                                  // if property value available in selected variant
                                  if (
                                    product.variants[variant][index].value.find(
                                      (item) => item[0] === value
                                    )
                                  ) {
                                    if (
                                      isSelected(
                                        productPropertyValues[index - 1].values[
                                          idx
                                        ]
                                      )
                                    ) {
                                      return (
                                        <img
                                          src={imageURL + value}
                                          className="inline-block border-[2px] border-red-500 p-1 mx-2 my-1 w-[50px]"
                                          key={idx}
                                          title={
                                            product.variants[variant][index - 1]
                                              .value[idx]
                                          }
                                          onClick={() =>
                                            handleColor(property, value)
                                          }
                                        />
                                      );
                                    } else {
                                      return (
                                        <img
                                          src={imageURL + value}
                                          className="inline-block border-[2px] border-yellow-500 p-1 mx-2 my-1 w-[50px]"
                                          key={idx}
                                          title={
                                            product.variants[variant][index - 1]
                                              .value[idx]
                                          }
                                          onClick={() =>
                                            handleColor(property, value)
                                          }
                                        />
                                      );
                                    }
                                  } else
                                    return (
                                      <img
                                        src={imageURL + value}
                                        className="inline-block border-[1px] p-1 mx-2 my-1 w-[50px]"
                                        key={idx}
                                        title={
                                          product.variants[variant][index - 1]
                                            .value[idx]
                                        }
                                      />
                                    );
                                }
                              )}
                        </div>
                      );
                    })}
                </div>
                <h2 className="text-2xl font-semibold">About</h2>
                <ul>
                  {product.length !== 0 &&
                    product.about.map((item, index) => {
                      return (
                        <li className="list-disc list-inside" key={index}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="md:w-[20%] w-full h-fit border-[1px]">
              <h2 className="text-xl text-center bg-slate-300 py-1">
                Checkout
              </h2>
              <div>
                <span className="text-2xl">{"$" + priceWhole}</span>
                <span className="align-super">{priceFraction}</span>
                {/* TODO: Remove */}
                {/* <p className="text-pretty">
                  {!!selectedProduct &&
                    JSON.stringify(selectedProduct).replaceAll(",", ", ")}
                </p> */}
              </div>
              <p>Ships to Kazakhstan</p>
              <p>No Import Fees &</p>
              <p>
                $
                {product &&
                  (Math.floor(product.priceCents / 100) * 0.1).toFixed(2)}{" "}
                Shipping
              </p>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-400 rounded-md py-1 px-3 my-2 w-[150px]"
                >
                  Add To Cart
                </button>
                <button className="bg-yellow-400 rounded-md py-1 px-3 my-2 w-[150px] text-blue-500">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductView;
