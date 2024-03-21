import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { genPrice } from "../../data/productFunctions";
import { Link } from "react-router-dom";

const Checkout = ({ handleSubmit }) => {
  const { product } = useContext(GlobalContext);

  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  useEffect(() => {
    setPrice(genPrice(product?.priceCents));
  }, [product?.priceCents]);

  return (
    <div className="md:w-[20%] w-full h-fit shadow-lg rounded-lg">
      <h2 className="text-xl text-center bg-slate-300 rounded-t-lg py-1">
        Checkout
      </h2>
      <div className="p-2">
        <div>
          <span className="text-2xl">{"$" + priceWhole}</span>
          <span className="align-super">{priceFraction}</span>
        </div>
        <p>Ships to Kazakhstan</p>
        <p>No Import Fees &</p>
        <p>
          $
          {!!product?.priceCents &&
            (Math.floor(product.priceCents / 100) * 0.1).toFixed(2)}{" "}
          Shipping
        </p>
        <div className="flex flex-col justify-center items-center rounded-b-lg">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 rounded-md py-1 px-3 my-2 w-[150px]"
          >
            Add To Cart
          </button>
          <Link
            to="/cart"
            className="bg-yellow-400 rounded-md py-1 px-3 w-[150px] text-blue-500"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
