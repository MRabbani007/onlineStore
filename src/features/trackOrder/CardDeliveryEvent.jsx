import React from "react";

const CardDeliveryEvent = ({ delEvent }) => {
  return (
    <div className="flex justify-between gap-5">
      <span
        className={
          delEvent?.name === "Delivered" ? "text-green-600 font-semibold" : ""
        }
      >
        {delEvent?.name}
      </span>
      <span>{delEvent?.date}</span>
    </div>
  );
};

export default CardDeliveryEvent;
