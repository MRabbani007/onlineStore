import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { genRatings } from "../../data/productFunctions";
import { Link } from "react-router-dom";

const ProdHeader = () => {
  const { product } = useContext(GlobalContext);

  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(genRatings(product?.rating?.stars));
  }, [product?.rating?.stars]);

  return (
    <section className="bg-slate-200 rounded-t-lg p-3">
      <div className="font-semibold text-xl">{product?.name}</div>
      <div>
        Visit the{" "}
        <Link to="/supplier" state={{ supplier: product.supplier }}>
          {product?.supplier?.includes("Store")
            ? product?.supplier
            : product?.supplier + " Store"}
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-yellow-500 text-2xl flex items-center">
          <span className="text-slate-950 mr-2">{product?.rating?.stars}</span>
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
            {product?.rating?.count.toLocaleString("en-US") + " Ratings, "}
          </span>
          <span>{product?.reviews.toLocaleString("en-US") + " Reviews"}</span>
        </div>
      </div>
    </section>
  );
};

export default ProdHeader;
