import React from "react";
import buyAgainImg from "../../images/icons/buy-again.png";
import keyboardImg from "../../images/products/redragon_gaming_keyboard_1.jpg";
import { IMAGE_URL } from "../data/utils";

const CardOrders = ({ order }) => {
  const getImage = (product) => {
    let i = product.property.findIndex((prop) => prop === "image");
    if (i > 0) {
      return product.value[i];
    }
  };
  if (!!order) {
    return (
      <div className="w-[80%] mx-auto border-[1px] rounded-md">
        {/* Header */}
        <div className="flex justify-between bg-slate-200 font-semibold px-3 py-1 rounded-t-md">
          <span className="w-[30%]">Order Placed</span>
          <span className="w-[20%]">Total</span>
          <span className="w-[40%]">Order ID:</span>
          <span className="">x</span>
        </div>
        <div className="flex justify-between bg-slate-200 px-3 py-1">
          <span className="w-[30%]">
            {order.orderDate.slice(0, 10) || "2023-11-11"}
          </span>
          <span className="w-[20%]">
            ${(order.priceCents.itemsPrice / 100).toFixed(2) || 0}
          </span>
          <span className="w-[40%]">{order.orderID || ""}</span>
          <span className="">-</span>
        </div>
        {/* Items */}
        {order.products.length === 0
          ? null
          : order.products.map((product, idx) => {
              return (
                <div key={idx} className="flex p-3">
                  {/* Product Image */}
                  <img
                    src={IMAGE_URL + getImage(product)}
                    alt=""
                    className="w-[20%] h-fit max-w-[150px] max-h-[100px] mx-5"
                  />
                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p>Arriving on: 2023-10-10</p>
                    <p>Quanity: {product.quantity}</p>
                    <button className="bg-yellow-500 rounded-md px-3 my-2 py-1">
                      <img
                        src={buyAgainImg}
                        alt=""
                        className="w-[30px] inline mr-3"
                      />
                      Buy it again
                    </button>
                  </div>
                  <div className="w-[15%]">
                    <button className="px-2 py-1 border-[1px] border-slate-400 mx-auto">
                      Track Package
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
};

export default CardOrders;
