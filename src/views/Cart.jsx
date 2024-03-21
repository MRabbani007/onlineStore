import { useContext, useEffect, useState } from "react";
// Imported Components
import CartProductCard from "../components/CartProductCard";
// Imported Data
import { GlobalContext } from "../context/GlobalState";

const Cart = () => {
  const { cart, handlePlaceOrder } = useContext(GlobalContext);

  console.log(cart);

  // Store Cart Total Price
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = () => {
    handlePlaceOrder();
  };

  useEffect(() => {
    let total = 0;
    cart.map((cartItem) => {
      total += cartItem.quantity * cartItem.priceCents;
    });
    setTotalPrice(total / 100);
  }, [cart]);

  return (
    <div className="text-slate-950 lg:px-5 px-2 md:gap-5">
      <h1 className="text-3xl font-bold text-center my-4">
        Checkout - {cart.length !== 0 && cart.length}{" "}
        {cart.length === 1 ? "item" : "items"}
      </h1>
      <h2 className="text-2xl font-bold my-2 mx-2">Review Your Order</h2>
      <div className="flex flex-wrap">
        <div className="lg:w-[70%] w-full mx-2">
          {cart?.length !== 0 &&
            cart.map((cartItem, index) => {
              return (
                <CartProductCard
                  cartItem={cartItem}
                  key={index}
                  group={index}
                />
              );
            })}
          {cart?.length === 0 && <p>No Items In Cart</p>}
        </div>
        <div className="lg:w-[25%] w-full mx-2">
          <div className="bg-slate-200 px-2 py-2 font-semibold">
            Order Summary
          </div>
          <ul className="px-5">
            <li className="flex justify-between py-3">
              <span>Items ({cart.length}):</span>
              <span>{totalPrice}</span>
            </li>
            <li className="flex justify-between py-3">
              <span>Shipping & handling:</span>
              <span>{(totalPrice * 0.2).toFixed(2)}</span>
            </li>
            <li className="flex justify-between py-3">
              <span>Total before tax:</span>
              <span>{(totalPrice * 1.2).toFixed(2)}</span>
            </li>
            <li className="flex justify-between py-3">
              <span>Estimated tax (10%):</span>
              <span>{(totalPrice * 0.1).toFixed(2)}</span>
            </li>
            <li className="flex justify-between py-3 text-red-600 font-semibold">
              <span>Order total:</span>
              <span>{(totalPrice * 1.3).toFixed(2)}</span>
            </li>
          </ul>
          <div className="flex justify-center">
            <button className="btn btn-yellow" onClick={() => handleSubmit()}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
