import React, { useEffect, useState } from "react";
// Imported Components
import Navbar from "../components/Navbar";
import CardOrders from "../components/CardOrders";
// Imported Data
import { fetchOrder } from "../data/productServerFunctions";

const OrdersPage = () => {
  // User information
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);

  const handleOrder = async (orderOption) => {
    if (userName === "") {
    } else {
      console.log("here");
      await fetchOrder(orderOption, userName).then((response) =>
        setOrders(response)
      );
    }
  };

  // Set username
  useEffect(() => {
    let data = localStorage.getItem("sleekUser");
    if (!!data) {
      setUserName(JSON.parse(data).username);
    }
  }, []);
  // Load Cart
  useEffect(() => {
    if (userName !== "") {
      handleOrder("get");
    }
  }, [userName]);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen py-[80px] text-slate-950 px-5 flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">
          My Orders - {orders.length} {orders.length === 1 ? "order" : "orders"}
        </h1>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order, index) => {
            return <CardOrders key={index} order={order} />;
          })
        )}
        {/* <CardOrders />
        <CardOrders /> */}
      </div>
    </>
  );
};

export default OrdersPage;
