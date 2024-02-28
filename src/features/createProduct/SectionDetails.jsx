import CardAddDetail from "./CardAddDetail";
import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import { FaTimes } from "react-icons/fa";

const SectionDetails = () => {
  const { product, dispatch } = useProduct();

  const handleDetails = (index) => {
    dispatch({ type: PRODUCT.DETAILS_REMOVE, payload: index });
  };

  return (
    <div>
      {/* Product Details */}
      <h2>Details</h2>
      <p>Brand, Material, ItemWeight...</p>
      <ul className="">
        {Array.isArray(product?.details) &&
          product?.details.map((item, index) => {
            return (
              <li key={index} className="flex flex-row items-center edit-cont">
                <span>{item.name + ": "}</span>
                <span>{item.value}</span>
                <FaTimes
                  className="btn-remove invisible"
                  onClick={() => handleDetails(index)}
                />
              </li>
            );
          })}
      </ul>
      <CardAddDetail />
    </div>
  );
};

export default SectionDetails;
