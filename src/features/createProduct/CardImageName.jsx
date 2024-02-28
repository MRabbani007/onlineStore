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
    <div className="edit-item group">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image Group Name"
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
          <span className="" onClick={handleImage}>
            {value === "" ? "No Name" : value}
          </span>
          <CiEdit
            className="icon hidden group-hover:inline"
            onClick={() => setEdit(true)}
          />
          <IoCloseOutline
            className="icon hidden group-hover:inline"
            onClick={() => handleRemove()}
          />
        </>
      )}
    </div>
  );
};

export default CardImageName;
