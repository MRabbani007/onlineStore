import { useState } from "react";
import { IoAdd, IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardAddArray = () => {
  const { dispatch } = useProduct();

  const [add, setAdd] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: PRODUCT.ARRAY_ADD,
      payload: value,
    });
  };

  return (
    <>
      {add ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setAdd(false)} />
        </form>
      ) : (
        <IoAdd className="icon" onClick={() => setAdd(true)} />
      )}
    </>
  );
};

export default CardAddArray;
