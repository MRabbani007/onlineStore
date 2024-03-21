import CardReview from "../features/trackOrder/CardReview";
import CardRating from "../features/trackOrder/CardRating";
import { useLocation } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";
import { useState } from "react";
import { IMAGE_URL } from "../data/utils";

const ReviewProduct = () => {
  const { orders } = useGlobal();

  const location = useLocation();

  const [product, setProduct] = useState(() => {
    if (location?.state?.orderID && location?.state?.prodID) {
      let tempOrder = orders.find(
        (item) => item.orderID === location.state.orderID
      );
      let tempProd = tempOrder.products.find(
        (item) => item.id === location.state.prodID
      );
      console.log(tempProd);
      return tempProd;
    } else {
      return orders[0].products[0];
    }
  });

  const getImage = () => {
    let propIndex = product.property.findIndex((prop) => prop === "image");
    let value = product.value[propIndex];
    return value.split(" ")[1] || value;
  };

  return (
    <div>
      <h1>Rate & Review This Product</h1>
      <div className="flex">
        <div className="flex flex-wrap border-2">
          {/* Left Col: Image */}
          <img
            src={IMAGE_URL + getImage(product)}
            alt=""
            className="max-h-[250px] object-contain"
          />
          <p className="px-3 max-w-[400px]">{product?.name}</p>
          <p className="px-3 max-w-[400px]">{product?.supplier}</p>
        </div>
        <div className="flex-1 border-2 px-3">
          <div className="flex gap-2">
            <span>Rating</span>
            <CardRating />
          </div>
          <CardReview />
        </div>
      </div>
    </div>
  );
};

export default ReviewProduct;
