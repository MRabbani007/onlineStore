import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import CardImageReference from "./CardImageReference";
import CardImageArray from "./CardImageArray";
import useProduct from "../../hooks/useProduct";
import CardAddItem from "./CardAddItem";
import { PRODUCT } from "../../data/actions";
import CardEditItem from "./CardEditItem";

const SectionImages = () => {
  const { product } = useProduct();

  // Control view of section
  const [view, setView] = useState(false);

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
      <div className={(view ? "flex flex-col gap-2" : "hidden") + " p-2"}>
        <CardImageReference />
        <CardEditItem
          initialValue={product?.imagesURL}
          type={PRODUCT.IMAGES_URL_EDIT}
          title="Images URL"
          showFormLabel={true}
        />
        {Array.isArray(product?.images) &&
          Array.isArray(product?.imagesNames) &&
          product?.images.map((imageArray, index) => {
            return (
              <CardImageArray
                key={index}
                imageArray={imageArray}
                imageName={product?.imagesNames[index]}
                arrayIndex={index}
                imagesURL={product?.imagesURL || ""}
              />
            );
          })}
        {/* <CardAddArray /> */}
        <CardAddItem
          type={PRODUCT.ARRAY_ADD}
          title="Add Image Array"
          placeholder="Array Name"
          showFormLabel={true}
        />
      </div>
    </div>
  );
};

export default SectionImages;
