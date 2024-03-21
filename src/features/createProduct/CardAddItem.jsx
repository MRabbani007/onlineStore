import { useId, useState } from "react";
import { IoAdd, IoCheckmark, IoCloseOutline } from "react-icons/io5";
import useProduct from "../../hooks/useProduct";

const CardAddItem = ({
  placeholder = "value",
  title = "add new",
  initialValue = "",
  type = "",
  showFormLabel = false,
  data = {},
}) => {
  const { dispatch } = useProduct();

  const [add, setAdd] = useState(false);
  const [value, setValue] = useState(initialValue);

  const [inputID, setInputID] = useState(crypto.randomUUID());

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: type,
      payload: { value, ...data },
    });
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <>
      {add ? (
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="flex flex-nowrap items-center w-fit gap-2"
        >
          <div className="field">
            <label htmlFor={inputID} className="field__label">
              {title}
            </label>
            <input
              type="text"
              id={inputID}
              placeholder={placeholder}
              title={title}
              className="rounded-md field__input"
              value={value}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 duration-200 rounded-md p-1"
          >
            <IoCheckmark className="icon" />
          </button>
          <button
            type="reset"
            className="bg-red-400 hover:bg-red-500 duration-200 rounded-md p-1"
          >
            <IoCloseOutline className="icon" />
          </button>
        </form>
      ) : (
        <div className={showFormLabel ? "field" : ""}>
          {showFormLabel ? <span className="field__label">{title}</span> : null}
          <IoAdd className="icon inline" onClick={() => setAdd(true)} />
        </div>
      )}
    </>
  );
};

export default CardAddItem;
