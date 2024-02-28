import CardImageName from "./CardImageName";
import CardImage from "./CardImage";
import CardAddImage from "./CardAddImage";
import useProduct from "../../hooks/useProduct";

const CardImageArray = ({ imageArray, imageName, arrayIndex }) => {
  const { dispatch } = useProduct();

  return (
    <div>
      <div className="flex flex-wrap items-center my-3 gap-3">
        <CardImageName
          imageName={imageName}
          arrayIndex={arrayIndex}
          dispatch={dispatch}
        />
        {!!imageArray &&
          imageArray.map((image, index) => {
            return (
              <CardImage
                key={index}
                prodImage={image}
                imageIndex={index}
                arrayIndex={arrayIndex}
                dispatch={dispatch}
              />
            );
          })}
        <CardAddImage arrayIndex={arrayIndex} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default CardImageArray;
