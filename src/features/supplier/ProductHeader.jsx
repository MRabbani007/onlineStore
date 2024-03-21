import { useEffect, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import useDebounce from "../../hooks/useDebounce";
import { PRODUCT } from "../../data/actions";
import DropDownOptions from "../../components/DropDownOptions";
import { categoryOptions } from "../../data/departments";

const ProductHeader = () => {
  const { product, dispatch, toggleProduct } = useProduct();

  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState(product?.name || "");
  const [supplier, setSupplier] = useState(product?.supplier || "");
  const [priceCents, setPriceCents] = useState(product?.priceCents || 0);
  const [stars, setStars] = useState(product?.rating?.stars || 0);
  const [ratings, setRatings] = useState(product?.rating?.count || 0);
  const [reviews, setReviews] = useState(product?.reviews || 0);
  const [visible, setVisible] = useState(true);

  const debounceName = useDebounce(name, 500);
  const debounceSupplier = useDebounce(supplier, 500);
  const debouncePriceCents = useDebounce(priceCents, 500);
  const debounceStars = useDebounce(stars, 500);
  const debounceRatings = useDebounce(ratings, 500);
  const debounceReviews = useDebounce(reviews, 500);

  const handleCategoryChange = (value) => {
    dispatch({ type: PRODUCT.CATEGORY, payload: value });
  };

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: PRODUCT.NAME, payload: { value: debounceName } });
    }
  }, [debounceName]);

  useEffect(() => {
    if (isMounted) {
      dispatch({
        type: PRODUCT.SUPPLIER,
        payload: { value: debounceSupplier },
      });
    }
  }, [debounceSupplier]);

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: PRODUCT.PRICE, payload: debouncePriceCents });
    }
  }, [debouncePriceCents]);

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: PRODUCT.RATINGS_STARS, payload: debounceStars });
    }
  }, [debounceStars]);

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: PRODUCT.RATINGS_COUNT, payload: debounceRatings });
    }
  }, [debounceRatings]);

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: PRODUCT.REVIEWS, payload: debounceReviews });
    }
  }, [debounceReviews]);

  useEffect(() => {
    if (isMounted) {
      setName(product?.name || "");
      setSupplier(product?.supplier || "");
      setPriceCents(product?.priceCents || 0);
      setRatings(product?.rating?.count);
      setStars(product?.rating?.stars);
      setVisible(product?.visible || true);
    }
  }, [toggleProduct]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="">
      <h2 className="bg-slate-200 rounded-lg shadow-md shadow-slate-300 py-2 px-4 flex justify-start items-center">
        Header
      </h2>
      <div className="form__product p-4">
        <div className="field__group3">
          {/* Supplier */}
          <label className="field">
            <span htmlFor="supplier" className="field__label">
              Supplier
            </span>
            <input
              type="text"
              id="supplier"
              className="field__input"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </label>
          {/* Product Category */}
          <DropDownOptions
            title={"Category"}
            options={categoryOptions}
            selectedValue={product?.category}
            handleSelected={handleCategoryChange}
            className="field__input"
          />
          {/* Visible */}
          <div className="border-[1px] rounded-md p-2">
            <input
              type="checkbox"
              id="visibile"
              className="mr-2"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            <label htmlFor="visible">Visible</label>
          </div>
        </div>
        {/* Product Name */}
        <label className="field">
          <span htmlFor="name" className="field__label">
            Product Name
          </span>
          <input
            type="text"
            id="name"
            className="field__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* Price Stars Ratings Reviews */}
        <div className="field__group4">
          {/* Price */}
          <label className="field">
            <span htmlFor="price" className="field__label">
              Price
            </span>
            <input
              type="text"
              id="price"
              className="field__input"
              value={priceCents}
              onChange={(e) => setPriceCents(e.target.value)}
            />
          </label>
          {/* Stars */}
          <label className="field">
            <span htmlFor="rating_stars" className="field__label">
              Stars
            </span>
            <input
              type="text"
              id="rating_stars"
              className="field__input"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </label>
          {/* Ratings */}
          <label className="field">
            <span htmlFor="rating_count" className="field__label">
              Ratings
            </span>
            <input
              type="text"
              id="rating_count"
              className="field__input"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
            />
          </label>
          {/* Reviews */}
          <label className="field">
            <span htmlFor="reviews" className="field__label">
              Reviews
            </span>
            <input
              type="text"
              id="reviews"
              className="field__input"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
