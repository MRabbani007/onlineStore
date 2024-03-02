import React from "react";
import CardOrderItem from "./CardOrderItem";

const OrderList = ({ loading, orders }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>OrderID</th>
            <th>Order Date</th>
            <th>UserID</th>
            <th>Order Status</th>
            <th>Order Price</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Array.isArray(orders) &&
            orders.map((order, index) => {
              return (
                <CardOrderItem order={order} key={order.orderID} idx={index} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
