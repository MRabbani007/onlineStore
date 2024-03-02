import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IMAGE_URL } from "../../data/utils";

const ProdImages = () => {
  const { productImages, mainImage, handleMainImage } =
    useContext(GlobalContext);

  return (
    <div className="md:w-[30%] w-full flex">
      <div className="mr-4 flex flex-col gap-2">
        {Array.isArray(productImages) &&
          productImages.map((image, index) => {
            return (
              <img
                key={index}
                src={IMAGE_URL + image}
                alt="image"
                className="image-thumb-sq"
                onMouseOver={() => handleMainImage(index)}
              />
            );
          })}
      </div>
      <div className="w-[300px]">
        {Array.isArray(productImages) && (
          <img src={IMAGE_URL + mainImage} alt="image" />
        )}
      </div>
    </div>
  );
};

export default ProdImages;
