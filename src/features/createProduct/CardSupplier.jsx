import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardSupplier = () => {
  const { product, dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(product?.supplier);

  const handleSubmit = () => {
    dispatch({ type: PRODUCT.SUPPLIER, payload: value });
    setEdit(false);
  };
  useEffect(() => {
    setValue(product?.supplier);
  }, [product?.supplier]);

  return (
    <div className="group">
      {edit ? (
        <>
          <input
            className="flex-1"
            placeholder="Supplier"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IoCheckmark className="icon" onClick={() => handleSubmit()} />
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </>
      ) : (
        <>
          <span>{"Visit the " + value}</span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
        </>
      )}
    </div>
  );
};

export default CardSupplier;
