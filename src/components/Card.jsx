import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Imported Hooks
import useAuth from "../hooks/useAuth";
import useGlobal from "../hooks/useGlobal";
// Imported Data
import { genRatings, genPrice } from "../data/productFunctions";
import { IMAGE_URL } from "../data/utils";
// Imported Icons
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import useProduct from "../hooks/useProduct";

const Card = ({ product }) => {
  const { handleOpenProduct } = useGlobal();
  const { handleOpenEditProduct } = useProduct();
  const { role } = useAuth();

  const [productImage, setProductImage] = useState("");
  const [stars, setStars] = useState([]);
  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  useEffect(() => {
    setStars(genRatings(product.rating.stars));
    setPrice(genPrice(product.priceCents));
    if (product.images.length) {
      setProductImage(product.images[0][0]);
    } else {
    }
  }, []);

  return (
    <div className="sm:w-[250px] w-full h-[300px] duration-200 shadow-md shadow-zinc-800 rounded-lg text-slate-950 p-2 overflow-hidden text-ellipsis z-1">
      <div className="w-full h-[70%]">
        <div className="flex w-full h-full justify-center relative">
          <img
            src={IMAGE_URL + (product?.imagesURL || "") + productImage}
            alt="image"
            className="object-fill image-lg cursor-pointer"
            onClick={() => handleOpenProduct(product?.id)}
          />
          {role === "Admin" && (
            <CiEdit
              className="icon absolute top-0 right-0 z-10 bg-slate-300 rounded-md"
              onClick={() => {
                handleOpenEditProduct(product?.id);
              }}
            />
          )}
        </div>
        {/* Price & Rating */}
        <div className="flex justify-between items-center">
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
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[1rem]">
          {product?.name}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Card;
