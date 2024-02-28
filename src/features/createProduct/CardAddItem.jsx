import { useEffect, useRef, useState } from "react";
import { IoAdd, IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardAddItem = ({ type, data }) => {
  const { dispatch } = useProduct();

  const inputRef = useRef();

  const [add, setAdd] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: type,
      payload: { value, data },
    });
  };

  useEffect(() => {
    if (add) {
      inputRef.current.focus();
    }
  }, [add]);

  return (
    <>
      {add ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
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

export default CardAddItem;
