import { useState } from "react";
import { IMAGE_URL } from "../../data/utils";
import useProduct from "../../hooks/useProduct";

const SectionDisplayImages = () => {
  const { productImages, mainImage, handleMainImage } = useProduct();

  const [expandMain, setExpandMain] = useState(false);

  return (
    <div className="flex gap-3">
      {/* Image Thumbs */}
      <div className="flex md:flex-col gap-2">
        {Array.isArray(productImages) &&
          productImages.map((image, index) => {
            if (image === "") {
              return (
                <div
                  key={index}
                  className="w-[60px] h-[60px] p-2 my-1 border-[1px] rounded-md"
                >
                  + add image
                </div>
              );
            } else {
              return (
                <img
                  key={index}
                  src={IMAGE_URL + image}
                  className="image-thumb"
                  onMouseOver={() => handleMainImage(index)}
                  onClick={() => {
                    setExpandMain(!expandMain);
                  }}
                />
              );
            }
          })}
      </div>
      {/* Main Image */}
      <div className={expandMain ? "" : " hidden" + " max-w-[300px]"}>
        {!!mainImage && <img src={IMAGE_URL + mainImage} alt="" />}
      </div>
    </div>
  );
};

export default SectionDisplayImages;
