import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IMAGE_URL } from "../../data/utils";

const ProdImages = () => {
  const { product, productImages, mainImage, handleMainImage } =
    useContext(GlobalContext);

  return (
    <div className="sm:w-[30%] w-full flex flex-wrap sm:flex-nowrap">
      <div className="flex mx-0 sm:mr-4 sm:flex-col flex-row flex-wrap gap-2">
        {Array.isArray(productImages) &&
          productImages.map((image, index) => {
            return (
              <img
                key={index}
                src={IMAGE_URL + (product?.imagesURL || "") + image}
                alt="image"
                className="image-thumb-sq"
                onMouseOver={() => handleMainImage(index)}
              />
            );
          })}
      </div>
      <div className="sm:w-[300px] w-full">
        {!!mainImage && (
          <img
            src={IMAGE_URL + (product?.imagesURL || "") + mainImage}
            alt="image"
          />
        )}
      </div>
    </div>
  );
};

export default ProdImages;
