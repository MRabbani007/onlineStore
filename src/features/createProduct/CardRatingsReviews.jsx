import { useEffect, useState } from "react";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardRatingsReviews = () => {
  const { product, dispatch } = useProduct();

  const [editRatingCount, setEditRatingCount] = useState(false);
  const [editReviews, setEditReviews] = useState(false);
  const [valueRatingCount, setValueRatingCount] = useState(0);
  const [valueReviews, setValueReviews] = useState(0);

  const handleSubmitRatingCount = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.RATINGS_COUNT, payload: valueRatingCount });
    setEditRatingCount(false);
  };

  const handleSubmitReviews = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.REVIEWS, payload: valueReviews });
    setEditReviews(false);
  };

  useEffect(() => {
    setValueRatingCount(product?.rating?.count || 0);
    setValueReviews(product?.reviews || 0);
  }, [product?.rating?.count, product?.reviews]);

  return (
    <div>
      {editRatingCount ? (
        <form onSubmit={handleSubmitRatingCount} id="rating-count">
          <input
            type="text"
            placeholder="Rating Count"
            value={valueRatingCount}
            onChange={(e) => setValueRatingCount(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            className="edit-item"
            onClick={() => {
              setEditReviews(false);
              setEditRatingCount(true);
            }}
          >
            {valueRatingCount.toLocaleString("en-US")}
          </span>
          <span>{" Ratings, "}</span>
        </>
      )}
      {editReviews ? (
        <form onSubmit={handleSubmitReviews} id="review">
          <input
            type="text"
            placeholder="Reviews"
            value={valueReviews}
            onChange={(e) => setValueReviews(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            className="edit-item"
            onClick={() => {
              setEditRatingCount(false);
              setEditReviews(true);
            }}
          >
            {valueReviews.toLocaleString("en-US")}
          </span>
          <span>{" Reviews"}</span>
        </>
      )}
    </div>
  );
};

export default CardRatingsReviews;
