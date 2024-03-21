import React from "react";
import CardRating from "./CardRating";
import { Link } from "react-router-dom";

const CardRatingAndReview = ({ orderID, prodID }) => {
  return (
    <div>
      <h3>Rate & Review</h3>
      <CardRating />
      <Link
        to="/reviewProduct"
        state={{ orderID, prodID }}
        className="text-blue-600"
      >
        Leave a review
      </Link>
    </div>
  );
};

export default CardRatingAndReview;
