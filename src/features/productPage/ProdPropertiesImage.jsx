import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IMAGE_URL } from "../../data/utils";

const ProdPropertiesImage = ({ addproperty, isSelected }) => {
  const { product, handleDisplayImages } = useContext(GlobalContext);

  // Add selected image & color
  const handleImage = (index) => {
    if (product?.imagesNames[index]) {
      addproperty(
        "image",
        product?.imagesNames[index].replaceAll(" ", "%20") +
          " " +
          product?.images[index][0]
      );
    }
    handleDisplayImages(index);
  };

  return (
    <div>
      <h3 className="text-slate-950 text-xl font-semibold my-2 ml-2">
        {product?.imagesBasedOn}
      </h3>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(product?.images) &&
          product.images.map((imageArray, index) => {
            return (
              <div key={index}>
                <img
                  src={IMAGE_URL + (product?.imagesURL || "") + imageArray[0]}
                  className={
                    (isSelected("image", imageArray[0])
                      ? " border-[2px] border-yellow-500 "
                      : "") + " image-thumb"
                  }
                  alt={product?.imagesNames[index]}
                  title={product?.imagesNames[index]}
                  onClick={() => {
                    handleImage(index);
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProdPropertiesImage;
