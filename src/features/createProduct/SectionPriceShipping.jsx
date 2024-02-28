import { useEffect, useState } from "react";
import { genPrice } from "../../data/productFunctions";
import { CiEdit } from "react-icons/ci";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const SectionPriceShipping = () => {
  const { product, dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(0);

  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.PRICE, payload: value });
    setEdit(false);
  };

  useEffect(() => {
    setValue(product?.priceCents);
  }, [product?.priceCents]);

  useEffect(() => {
    setPrice(genPrice(value));
  }, [value]);

  return (
    <div className="">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Price Cents"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </form>
      ) : (
        <div className="edit-item group">
          <span className="text-2xl">{"$" + priceWhole}</span>
          <span className="align-super">{priceFraction}</span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
        </div>
      )}
      <div>Ships to Kazakhstan</div>
    </div>
  );
};

export default SectionPriceShipping;
