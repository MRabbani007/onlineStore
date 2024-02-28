import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardName = () => {
  const { product, dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(product?.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.NAME, payload: value });
    setEdit(false);
  };
  useEffect(() => {
    setValue(product?.name);
  }, [product?.name]);

  return (
    <div className="edit-item group">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </form>
      ) : (
        <>
          <span className="font-semibold text-2xl">{value}</span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
        </>
      )}
    </div>
  );
};

export default CardName;
