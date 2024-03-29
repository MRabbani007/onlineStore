import { useContext, useEffect, useState } from "react";
// Imported Data
import { genPrice } from "../data/productFunctions";
import { IMAGE_URL } from "../data/utils";
import { GlobalContext } from "../context/GlobalState";

const CartProductCard = ({ cartItem, group }) => {
  const { handleOpenProduct, handleCartRemove, handleCartUpdateQuantity } =
    useContext(GlobalContext);

  const [image, setImage] = useState("");
  const [price, setPrice] = useState({ priceWhole: 0, priceFraction: 0 });

  useEffect(() => {
    setPrice(genPrice(cartItem.priceCents));
    setImage(IMAGE_URL + (cartItem?.imagesURL || "") + getValue("image"));
  }, [cartItem]);

  const getValue = (property) => {
    let propIndex = cartItem.property.findIndex((prop) => prop === property);
    let value = cartItem.value[propIndex];
    if (property === "image") {
      return value.split(" ")[1] || value;
    } else {
      return value;
    }
  };

  // TODO: implement handle radio for shipping dates
  const handleRadio = () => {};

  const handleQuantity = (itemIndex, quantity) => {
    handleCartUpdateQuantity(itemIndex, quantity, cartItem.id);
  };

  const genShipping = () => {
    let options = [
      { date: date.getDay() + date.getDate() + date.getMonth(), shipping: 10 },
    ];
  };

  return (
    <div className="w-full border-[1px] rounded-lg mb-3">
      {/* Header */}
      <div className="bg-slate-200 text-green-700 font-semibold px-3 py-1">
        Delivery Date
      </div>
      {/* Body */}
      <div className="flex flex-wrap justify-between p-3">
        {/* Left Col: Image */}
        <div className="mr-3 my-3 w-[20%] flex justify-center">
          <img src={image} alt="" className="object-fit" />
        </div>
        <div className="flex flex-wrap flex-1">
          {/* Middle Col: Product Info */}
          <div className="lg:flex-1 w-full">
            <h2 className="text-xl font-semibold overflow-hidden text-wrap text-ellipsis w-[95%]">
              {cartItem?.name}
            </h2>
            <div className="">
              <span className="text-2xl">{"$" + price.priceWhole}</span>
              <span className="align-super">{price.priceFraction}</span>
            </div>
            <div className="my-2">
              <span className="mx-3">Quantity:</span>
              <select
                name="quantity"
                value={cartItem.quantity}
                onChange={(e) => handleQuantity(group, e.target.value)}
                id=""
                className="border-[1px] inline-block"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="my-2">
              <button
                onClick={() => handleCartRemove(cartItem.id)}
                className="btn btn-yellow mr-2"
              >
                Remove Item
              </button>
              <button className="btn btn-blue">Update</button>
            </div>
          </div>
          {/* Right Col: Delivery Options */}
          <div className="lg:w-[20%] w-full">
            <h3 className="font-semibold">Choose a delivery option:</h3>
            <ul>
              <li>
                <input
                  type="radio"
                  name={group}
                  onChange={handleRadio}
                  checked
                />
                <span>Tuesday, June 21</span>
                <p className="text-green-700">FREE Shipping</p>
              </li>
              <li>
                <input type="radio" name={group} onChange={handleRadio} />
                <span>Wednesday, June 15</span>
                <p className="text-green-700">$4.99 - Shipping</p>
              </li>
              <li>
                <input type="radio" name={group} onChange={handleRadio} />
                <span>Monday, June 13</span>
                <p className="text-green-700">$9.99 - Shipping</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
