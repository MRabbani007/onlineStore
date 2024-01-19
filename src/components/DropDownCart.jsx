import React, { forwardRef, useEffect, useState } from "react";
// import { getProductSummary } from "../data/productFunctions";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../data/utils";

const DropDownCart = forwardRef(({ cart, cartMenu }, ref) => {
  // Page navigation
  const navigate = useNavigate();

  const getValue = (cartItemIndex, property) => {
    let value = "";
    cart[cartItemIndex].property.map((prop, index) => {
      if (prop === property) {
        value = cart[cartItemIndex].value[index];
      }
    });
    return value;
  };

  const handleClick = (productID) => {
    navigate("/product", { state: { productID: productID } });
  };

  return (
    <div
      ref={ref}
      className={`${
        cartMenu
          ? "absolute visible translate-y-0 opacity-100"
          : "absolute invisible translate-y-[-20px] opacity-0"
      }  right-0 z-10 mt-2 w-fit rounded-md origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none duration-500`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <Link
        to="/cart"
        key={"ViewCart-link"}
        role="menuitem"
        tabIndex="-1"
        id={"menu-item-link"}
        className="text-gray-700 w-[400px] flex justify-center font-bold rounded-t-md h-fit border-b-[1px] px-4 py-2 text-sm cursor-pointer hover:bg-slate-300"
      >
        <span>View Cart</span>
      </Link>
      {cart.map((cartItem, index) => {
        return (
          <div
            key={index}
            role="menuitem"
            tabIndex="-1"
            id={"menu-item-" + index}
            onClick={() => handleClick(cartItem.id)}
            className={`text-gray-700 w-[400px] flex justify-between px-4 py-2 text-sm cursor-pointer hover:bg-slate-300 ${
              index === cart.length - 1 ? "rounded-b-md" : ""
            }`}
          >
            {cartItem.length !== 0 && (
              <>
                <div className="w-[100px]">
                  <img
                    src={IMAGE_URL + getValue(index, "image")}
                    alt=""
                    className="min-w-[80px] max-h-[80px]"
                  />
                </div>
                <div className="w-[80px] shrink-0 text-center text-yellow-500 font-semibold">
                  ${(cartItem.priceCents / 100).toFixed(2)}
                </div>
                <div className="">{cartItem.name}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default DropDownCart;
