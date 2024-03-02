import React from "react";

const CardOrderItem = ({ order, idx }) => {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{order?.orderID}</td>
      <td>{order?.orderDate}</td>
      <td>{order?.userID}</td>
      <td>{order?.orderStatus}</td>
      <td>{order?.priceCents.itemsPrice + order?.priceCents.shippingPrice}</td>
      <td>{order?.products.length}</td>
    </tr>
  );
};

export default CardOrderItem;
