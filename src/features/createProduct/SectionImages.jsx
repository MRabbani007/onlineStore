import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import CardImageReference from "./CardImageReference";
import CardImageArray from "./CardImageArray";
import CardAddArray from "./CardAddArray";
import useProduct from "../../hooks/useProduct";

const SectionImages = () => {
  const { product } = useProduct();

  // Control view of section
  const [view, setView] = useState(true);

  return (
    <div>
      {/* Header */}
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Images
      </h2>
      <div className={(view ? "flex flex-col" : "hidden") + " p-2"}>
        <CardImageReference />
        {Array.isArray(product?.images) &&
          Array.isArray(product?.imagesNames) &&
          product?.images.map((imageArray, index) => {
            return (
              <CardImageArray
                key={index}
                imageArray={imageArray}
                imageName={product?.imagesNames[index]}
                arrayIndex={index}
              />
            );
          })}
        <CardAddArray />
      </div>
    </div>
  );
};

export default SectionImages;
