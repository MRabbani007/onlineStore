import CardImageName from "./CardImageName";
import CardImage from "./CardImage";
import CardAddItem from "./CardAddItem";
import { PRODUCT } from "../../data/actions";

const CardImageArray = ({ imageArray, imageName, arrayIndex, imagesURL }) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-2 rounded-md p-2">
        <CardImageName imageName={imageName} arrayIndex={arrayIndex} />
        {!!imageArray &&
          imageArray.map((image, index) => {
            return (
              <CardImage
                key={index}
                prodImage={image}
                imageIndex={index}
                arrayIndex={arrayIndex}
                imagesURL={imagesURL}
              />
            );
          })}
        <CardAddItem
          type={PRODUCT.IMAGES_ADD}
          data={{ arrayIndex }}
          placeholder="Add Image"
          title="Add Image"
          showFormLabel={false}
        />
      </div>
    </div>
  );
};

export default CardImageArray;
