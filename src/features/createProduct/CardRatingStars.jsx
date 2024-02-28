import { useEffect, useState } from "react";
import {
  IoCheckmark,
  IoCloseOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import { genRatings } from "../../data/productFunctions";
import { CiEdit } from "react-icons/ci";
import useProduct from "../../hooks/useProduct";

const CardRatingStars = () => {
  const { product, dispatch } = useProduct();

  const [stars, setStars] = useState([]);

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.RATINGS_STARS, payload: value });
    setEdit(false);
  };

  useEffect(() => {
    setValue(product?.rating?.stars || 0);
  }, [product?.rating?.stars]);

  useEffect(() => {
    setStars(genRatings(value));
  }, [value]);

  return (
    <div className="text-2xl flex items-center group">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Rating Stars"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </form>
      ) : (
        <div className="flex items-center">
          <span className="mr-2 edit-item">{value}</span>
          <span className="text-yellow-500">
            {stars.map((star, index) => {
              return star === "f" ? (
                <IoStar className="icon-md" key={index} />
              ) : star === "h" ? (
                <IoStarHalf className="icon-md" key={index} />
              ) : (
                <IoStarOutline className="icon-md" key={index} />
              );
            })}
          </span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
        </div>
      )}
    </div>
  );
};

export default CardRatingStars;
