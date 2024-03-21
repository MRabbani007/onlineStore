import React, { useState } from "react";
import useGlobal from "../hooks/useGlobal";
import SectionOrder from "../features/trackOrder/SectionOrder";
import { useLocation } from "react-router-dom";

const TrackOrder = () => {
  const { orders } = useGlobal();

  const location = useLocation();

  const [order, setOrder] = useState(() => {
    if (location?.state?.orderID) {
      let temp = orders.find((item) => item.orderID === location.state.orderID);
      return temp;
    } else {
      return orders[0];
    }
  });

  return (
    <div className="mx-5">
      <h1>Track Package</h1>
      <div>
        {/* {Array.isArray(orders) &&
          orders.map((order, index) => {
            return <SectionOrder order={order} key={index} />;
          })} */}
        <SectionOrder order={order} />
      </div>
    </div>
  );
};

export default TrackOrder;
