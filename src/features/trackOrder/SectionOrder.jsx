import React from "react";
import CardPackage from "./CardPackage";
import { IoCloseOutline } from "react-icons/io5";

const SectionOrder = ({ order }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap sm:flex-row flex-col justify-between bg-slate-200  px-3 py-1 rounded-t-md">
        <div className="sm:w-[25%] w-full min-w-fit">
          <p className="font-semibold">Order Placed</p>
          <p>{order.orderDate.slice(0, 10) || "2023-11-11"}</p>
        </div>
        <div className="sm:w-[20%] w-full min-w-fit">
          <p className="font-semibold">Total</p>
          <p>${(order.priceCents.itemsPrice / 100).toFixed(2) || 0}</p>
        </div>
        <div className="sm:w-[40%] w-full min-w-fit">
          <p className="font-semibold">Order ID:</p>
          <p>{order.orderID || ""}</p>
        </div>
        <div className="">
          <IoCloseOutline className="icon-md" />
        </div>
      </div>
      {/* Items */}
      {Array.isArray(order?.products)
        ? order.products.map((product, idx) => {
            return <CardPackage orderItem={product} key={idx} />;
          })
        : null}
    </div>
  );
};

export default SectionOrder;
