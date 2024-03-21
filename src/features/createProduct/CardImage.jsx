import { useEffect, useState } from "react";
import { IMAGE_URL } from "../../data/utils";
import { PRODUCT } from "../../data/actions";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import useProduct from "../../hooks/useProduct";
import InputForm from "../../components/InputForm";

const CardImage = ({ prodImage, imageIndex, arrayIndex, imagesURL }) => {
  const { dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(prodImage);

  const handleSubmit = (value) => {
    dispatch({
      type: PRODUCT.IMAGES_EDIT,
      payload: { arrayIndex, imageIndex, value },
    });
    setEdit(false);
  };

  const handleClose = () => {
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
        <InputForm handleSubmit={handleSubmit} handleClose={handleClose} />
      ) : (
        <div className="group relative">
          <img
            alt="image"
            src={IMAGE_URL + imagesURL + value}
            className="image-thumb border-[1px] rounded-sm"
          />
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
