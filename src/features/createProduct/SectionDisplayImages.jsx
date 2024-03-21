import { useState } from "react";
import { IMAGE_URL } from "../../data/utils";
import useProduct from "../../hooks/useProduct";

const SectionDisplayImages = () => {
  const { productImages, mainImage, handleMainImage } = useProduct();

  const [expandMain, setExpandMain] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      {/* Image Thumbs */}
      <div className="flex sm:flex-col gap-2 mx-auto">
        {Array.isArray(productImages) &&
          productImages.map((image, index) => {
            if (image === "") {
              return (
                <div
                  key={index}
                  className="w-[60px] h-[60px] p-2 my-1 border-[2px] border-slate-400 hover:border-yellow-400 duraion-200 rounded-md"
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
      <div className={(expandMain ? "" : " hidden ") + " w-[300px] mx-auto"}>
        {!!mainImage && (
          <img
            src={IMAGE_URL + mainImage}
            alt=""
            className="object-contain max-w-[300px] h-[400px] mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default SectionDisplayImages;
