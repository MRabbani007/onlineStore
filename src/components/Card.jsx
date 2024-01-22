import React, { useEffect, useState } from "react";
// Imported Data
import { genRatings, genPrice } from "../data/productFunctions";
import { IMAGE_URL } from "../data/utils";
// Imported Icons
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const Card = ({ product, handleClick }) => {
  const [productImage, setProductImage] = useState("");
  const [stars, setStars] = useState([]);
  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  useEffect(() => {
    setStars(genRatings(product));
    setPrice(genPrice(product.priceCents));
    if (product.images.length) {
      setProductImage(product.images[0][0]);
    } else {
    }
  }, []);

  return (
    <div
      onClick={() => handleClick(product.id)}
      className="md:w-[250px] w-[300px] h-[300px] text-slate-950 border-[1px] border-slate-300 overflow-hidden text-ellipsis"
    >
      <div className="w-full h-[70%]">
        <div className="flex justify-center">
          <img
            src={IMAGE_URL + productImage}
            alt="image"
            className="w-auto h-[200px] object-fit image-lg"
          />
        </div>
        {/* Price & Rating */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="">
            <span className="text-2xl">${priceWhole}</span>
            <span className="align-super">{priceFraction}</span>
          </div>
          <div className="text-yellow-500 flex text-2xl">
            {stars.map((star, index) => {
              return star === "f" ? (
                <IoStar key={index} />
              ) : star === "h" ? (
                <IoStarHalf key={index} />
              ) : (
                <IoStarOutline key={index} />
              );
            })}
          </div>
        </div>
        {/* Item Name */}
        <div className="overflow-hidden text-ellipsis px-2">{product.name}</div>
      </div>
      <div></div>
    </div>
  );
};

export default Card;
