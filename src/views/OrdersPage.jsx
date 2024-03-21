import { useContext, useEffect, useState } from "react";
// Imported Components
import CardOrders from "../components/CardOrders";
// Imported Data
import { GlobalContext } from "../context/GlobalState";

const OrdersPage = () => {
  const { orders } = useContext(GlobalContext);

  return (
    <div className="text-slate-950 px-2 flex flex-col md:gap-5">
      <h1 className="text-3xl font-bold text-center">
        My Orders -{" "}
        {orders?.length + (orders.length === 1 ? " order" : " orders")}
      </h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => {
          return <CardOrders key={index} order={order} />;
        })
      )}
    </div>
  );
};

export default OrdersPage;
