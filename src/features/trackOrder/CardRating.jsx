import React, { useEffect, useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { genRatings } from "../../data/productFunctions";

const CardRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [stars, setStars] = useState(genRatings(0));

  const handleRating = (index) => {
    setRating(index + 1);
  };
  const handleHoverRating = (index) => {
    setHoverRating(index + 1);
  };

  useEffect(() => {
    if (hoverRating === 0 && rating !== 0) {
      setStars(genRatings(rating));
    } else {
      setStars(genRatings(hoverRating));
    }
  }, [hoverRating]);

  useEffect(() => {
    setStars(genRatings(rating));
  }, [rating]);

  return (
    <div className="text-yellow-500">
      {stars.map((star, index) => {
        if (star === "e") {
          return (
            <IoStarOutline
              className="icon-md"
              onClick={() => handleRating(index)}
              onMouseEnter={() => handleHoverRating(index)}
              onMouseLeave={() => handleHoverRating(-1)}
              key={index}
            />
          );
        } else if (star === "f") {
          return (
            <IoStar
              className="icon-md"
              onClick={() => handleRating(index)}
              onMouseEnter={() => handleHoverRating(index)}
              onMouseLeave={() => handleHoverRating(-1)}
              key={index}
            />
          );
        }
      })}
    </div>
  );
};

export default CardRating;
