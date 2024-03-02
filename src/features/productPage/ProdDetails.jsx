import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const ProdDetails = () => {
  const { product } = useContext(GlobalContext);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Details</h2>
      <ul>
        {Array.isArray(product?.details) &&
          product.details.map((item, index) => {
            return (
              <li className="list-disc list-inside" key={index}>
                {item.name + ": " + item.value}
              </li>
            );
          })}
      </ul>
      <h2 className="text-2xl font-semibold">About</h2>
      <ul>
        {Array.isArray(product?.about) &&
          product.about.map((item, index) => {
            return (
              <li className="list-disc list-inside" key={index}>
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProdDetails;
