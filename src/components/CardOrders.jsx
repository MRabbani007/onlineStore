import React, { useContext } from "react";
// Imported Data
import { IMAGE_URL } from "../data/utils";
// Imported Media
import buyAgainImg from "../assets/icons/buy-again.png";
import { IoCloseOutline } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import CardRatingAndReview from "../features/trackOrder/CardRatingAndReview";

const CardOrders = ({ order }) => {
  const { handleOpenProduct } = useContext(GlobalContext);

  const getImage = (product) => {
    let i = product.property.findIndex((prop) => prop === "image");
    if (i >= 0) {
      return product.value[i].split(" ")[1] || product.value[i];
    }
  };

  if (!!order) {
    return (
      <div className="lg:max-w-[80%] mx-auto border-[1px] rounded-md">
        {/* Header */}
        <div className="flex flex-wrap sm:flex-row flex-col justify-between bg-slate-200  px-3 py-1 rounded-t-md">
          <div className="sm:w-[30%] w-full min-w-fit">
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
        {order?.products?.length === 0
          ? null
          : order.products.map((product, idx) => {
              return (
                <div key={idx} className="flex flex-wrap p-3 gap-3">
                  {/* Product Image */}
                  <div className="w-[20%] max-w-[150px] max-h-[200px] overflow-hidden">
                    <img
                      src={
                        IMAGE_URL +
                        (product?.imagesURL || "") +
                        getImage(product)
                      }
                      alt=""
                      className="object-contain"
                    />
                  </div>
                  {/* Product Info */}
                  <div className="flex flex-wrap flex-1 mx-5">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-xl font-semibold">{product.name}</p>
                      <p>Arriving on: 2023-10-10</p>
                      <p>Quanity: {product.quantity}</p>
                      <button
                        onClick={() => {
                          handleOpenProduct(product?.prodID || product?.id);
                        }}
                        className="bg-yellow-500 rounded-md px-3 my-2 py-1"
                      >
                        <img
                          src={buyAgainImg}
                          alt=""
                          className="w-[30px] inline mr-3"
                        />
                        Buy it again
                      </button>
                    </div>
                  </div>
                  {/* Track Package */}
                  <div className="md:w-[15%] min-w-fit">
                    <Link
                      to="/trackOrder"
                      state={{ orderID: order.orderID }}
                      className="px-2 py-1 text-nowrap border-[1px] border-slate-400 mx-auto"
                    >
                      Track Package
                    </Link>
                    <CardRatingAndReview
                      orderID={order.orderID}
                      prodID={product.id}
                    />
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
};

export default CardOrders;
