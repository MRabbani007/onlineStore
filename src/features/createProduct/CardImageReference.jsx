import React, { useEffect, useState } from "react";
import { PRODUCT } from "../../data/actions";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import useProduct from "../../hooks/useProduct";

const CardImageReference = () => {
  const { product, dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(product?.imageReference || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.IMAGE_REFERENCE, payload: value });
    setEdit(false);
  };
  useEffect(() => {
    setValue(product?.imageReference);
  }, [product?.imageReference]);

  return (
    <div>
      <span>Images based on: </span>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image Reference"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </form>
      ) : (
        <span className="group">
          <span className="edit-item">{value}</span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
        </span>
      )}
    </div>
  );
};

export default CardImageReference;
