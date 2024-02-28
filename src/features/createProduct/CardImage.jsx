import { useEffect, useState } from "react";
import { IMAGE_URL } from "../../data/utils";
import { PRODUCT } from "../../data/actions";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import useProduct from "../../hooks/useProduct";

const CardImage = ({ prodImage, imageIndex, arrayIndex }) => {
  const { dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(prodImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: PRODUCT.IMAGES_EDIT,
      payload: { arrayIndex, imageIndex, value },
    });
    setEdit(false);
  };

  const handleRemove = () => {
    setEdit(false);
    dispatch({
      type: PRODUCT.IMAGES_REMOVE,
      payload: { imageIndex, arrayIndex },
    });
  };

  useEffect(() => {
    setValue(prodImage);
  }, [prodImage]);

  return (
    <div className="edit-cont">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>
            <IoCheckmark className="icon" />
          </button>
          <IoCloseOutline className="icon" onClick={() => setEdit(false)} />
        </form>
      ) : (
        <div className="group relative">
          <img alt="image" src={IMAGE_URL + value} className="image-thumb" />
          <CiEdit
            className="icon-md invisible group-hover:visible absolute top-0 left-0 bg-slate-200"
            onClick={() => setEdit(true)}
          />
          <FaTimes
            className="btn-remove absolute top-0 right-0 invisible"
            onClick={handleRemove}
          />
        </div>
      )}
    </div>
  );
};

export default CardImage;
