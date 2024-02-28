import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import { IoAdd, IoClose } from "react-icons/io5";

const CardAddDetail = () => {
  const { dispatch } = useProduct();

  const [add, setAdd] = useState(false);
  const inputRef = useRef();

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT.DETAILS_ADD, payload: { name, detail } });
  };

  useEffect(() => {
    if (add) {
      inputRef.current.focus();
    }
  }, [add]);

  return (
    <>
      {!add ? (
        <IoAdd className="icon" onClick={() => setAdd(true)} />
      ) : (
        <form onSubmit={handleSubmit} className="input-block-row">
          <label htmlFor="detailname">Name</label>
          <input
            name="detailname"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
            className=""
          />
          <label htmlFor="detaildesc">Detail</label>
          <input
            name="detaildesc"
            type="text"
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className=""
          />
          <button>
            <FaPlus className="btn-add" />
          </button>
          <IoClose className="icon" onClick={() => setAdd(false)} />
        </form>
      )}
    </>
  );
};

export default CardAddDetail;
