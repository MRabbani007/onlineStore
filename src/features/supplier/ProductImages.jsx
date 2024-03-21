import CardImageReference from "../createProduct/CardImageReference";
import useProduct from "../../hooks/useProduct";
import CardImageArray from "../createProduct/CardImageArray";
import { PRODUCT } from "../../data/actions";
import CardAddItem from "../createProduct/CardAddItem";
import CardEditItem from "../createProduct/CardEditItem";

const ProductImages = () => {
  const { product } = useProduct();

  return (
    <div className="form__product">
      <h2 className="bg-slate-200 rounded-lg shadow-md shadow-slate-300 py-2 px-4 flex justify-start items-center">
        Images
      </h2>
      <div className="flex flex-col gap-3 p-4">
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
                imagesURL={product?.imagesURL || ""}
                arrayIndex={index}
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

export default ProductImages;
