import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../data/utils";
import buyAgainImg from "../../assets/icons/buy-again.png";
import CardDeliveryEvent from "./CardDeliveryEvent";
import CardRatingAndReview from "./CardRatingAndReview";

const getImage = (product) => {
  let i = product.property.findIndex((prop) => prop === "image");
  if (i > 0) {
    return product.value[i].split(" ")[1] || product.value[i];
  }
};

const delEvents = [
  { name: "Delivered", date: "2024-02-08" },
  { name: "Arrived to destination city", date: "2024-02-06" },
  { name: "Arrived at sorting facility", date: "2024-02-04" },
  { name: "Item Shipped from Warehouse", date: "2024-02-02" },
  { name: "Your Order is being Processed", date: "2024-02-01" },
];

const CardPackage = ({ orderItem: product }) => {
  return (
    <div>
      <div className="flex justify-between flex-wrap gap-3 p-3">
        {/* Product Image */}
        <div className="w-[20%] max-w-[150px] max-h-[200px] overflow-hidden">
          <img
            src={IMAGE_URL + getImage(product)}
            alt=""
            className="object-contain"
          />
        </div>
        {/* Product Info */}
        <div className="flex flex-wrap flex-1 mx-5">
          <div className="flex-1 min-w-[200px]">
            <p className="text-xl font-semibold overflow-hidden text-ellipsis h-14">
              {product.name}
            </p>
            <p>Arriving on: 2023-10-10</p>
            <p>Quanity: {product.quantity}</p>
            <button
              onClick={() => {
                handleOpenProduct(product?.prodID || product?.id);
              }}
              className="bg-yellow-500 rounded-md px-3 my-2 py-1"
            >
              <img src={buyAgainImg} alt="" className="w-[30px] inline mr-3" />
              Buy it again
            </button>
          </div>
          <div className="w-fit">
            {delEvents.map((delEvent, index) => {
              return <CardDeliveryEvent delEvent={delEvent} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPackage;
