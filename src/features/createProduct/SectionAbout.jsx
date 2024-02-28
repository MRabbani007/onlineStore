import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import CardAddAbout from "./CardAddAbout";
import { FaTimes } from "react-icons/fa";

const SectionAbout = () => {
  const { product, dispatch } = useProduct();

  const handleAbout = (index) => {
    dispatch({ type: PRODUCT.ABOUT_REMOVE, payload: index });
  };

  return (
    <div>
      {/* Product About */}
      <h2 className="flex items-center">About</h2>
      <ul className="">
        {Array.isArray(product?.about) &&
          product?.about.map((item, index) => {
            return (
              <li key={index} className="flex flex-row items-center edit-cont">
                {item}
                <FaTimes
                  className="btn-remove invisible"
                  onClick={() => handleAbout(index)}
                />
              </li>
            );
          })}
      </ul>
      <CardAddAbout />
    </div>
  );
};

export default SectionAbout;
