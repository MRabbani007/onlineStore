import React, { useEffect, useState } from "react";
import { PRODUCT } from "../../data/actions";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import useProduct from "../../hooks/useProduct";

const CardImageReference = () => {
  const { product, dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(product?.imagesBasedOn || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.IMAGE_REFERENCE, payload: { value } });
    setEdit(false);
  };

  // useEffect(() => {
  //   console.log(product.imagesBasedOn);
  //   setValue(product?.imagesBasedOn);
  // }, [product?.imagesBasedOn]);

  return (
    <div className="field">
      <span className="field__label">Image Reference</span>
      {edit ? (
        <form onSubmit={handleSubmit} className="flex gap-2 w-fit">
          <input
            type="text"
            placeholder="Image Reference"
            value={value}
            className="field__input"
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 duration-200 rounded-md p-1"
          >
            <IoCheckmark className="icon-md" />
          </button>
          <button
            type="reset"
            className="bg-red-400 hover:bg-red-500 duration-200 rounded-md p-1"
          >
            <IoCloseOutline
              className="icon-md"
              onClick={() => setEdit(false)}
            />
          </button>
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
