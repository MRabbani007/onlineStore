import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { PRODUCT } from "../../data/actions";
import useProduct from "../../hooks/useProduct";

const CardImageName = ({ imageName, arrayIndex }) => {
  const { dispatch, handleDisplayImage } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: PRODUCT.IMAGES_NAMES_EDIT,
      payload: { value, arrayIndex },
    });
    setEdit(false);
  };

  const handleRemove = () => {
    dispatch({
      type: PRODUCT.ARRAY_REMOVE,
      payload: arrayIndex,
    });
  };

  const handleImage = () => {
    handleDisplayImage(arrayIndex);
  };

  useEffect(() => {
    setValue(imageName);
  }, [imageName]);

  return (
    <div className="edit-item">
      {edit ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-fit">
          <input
            type="text"
            placeholder="Image Group Name"
            value={value}
            className="field__input"
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <IoCheckmark className="icon" />
          </button>
          <button type="reset">
            <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
          </button>
        </form>
      ) : (
        <div className="group">
          <span className="" onClick={handleImage}>
            {value === undefined || value === "" ? "No Name" : value}
          </span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={() => setEdit(true)}
          />
          <IoCloseOutline
            className="icon invisible group-hover:visible"
            onClick={() => handleRemove()}
          />
        </div>
      )}
    </div>
  );
};

export default CardImageName;
