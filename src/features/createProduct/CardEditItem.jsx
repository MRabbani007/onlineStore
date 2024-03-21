import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import useProduct from "../../hooks/useProduct";

const CardEditItem = ({
  initialValue = "",
  type = "",
  data = {},
  title = "",
  placeholder = "",
  showFormLabel = false,
}) => {
  const { dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(initialValue);

  const [inputID, setInputID] = useState(crypto.randomUUID());

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type, payload: { value, ...data } });
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="">
      {edit ? (
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="flex flex-nowrap w-fit gap-2"
        >
          <div className={showFormLabel ? "" : ""}>
            {showFormLabel ? (
              <label htmlFor={inputID} className="field__label">
                {title}
              </label>
            ) : null}
            <input
              type="text"
              id={inputID}
              placeholder={placeholder}
              value={value}
              className="field__input"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button type="submit">
            <IoCheckmark className="icon" />
          </button>
          <button type="reset">
            <IoCloseOutline className="icon" />
          </button>
        </form>
      ) : (
        <div className="field gap-2 group">
          {showFormLabel ? (
            <label htmlFor={inputID} className="field__label">
              {title}
            </label>
          ) : null}
          <span className="edit-item">
            {value}
            <CiEdit
              className="icon invisible group-hover:visible"
              onClick={() => setEdit(true)}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default CardEditItem;
