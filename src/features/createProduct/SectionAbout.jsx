import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import { FaTimes } from "react-icons/fa";
import CardAddItem from "./CardAddItem";

const SectionAbout = () => {
  const { product, dispatch } = useProduct();

  const handleAbout = (index) => {
    dispatch({ type: PRODUCT.ABOUT_REMOVE, payload: index });
  };

  return (
    <div className="rounded-md border-2 p-2">
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
      <CardAddItem
        type={PRODUCT.ABOUT_ADD}
        placeholder="Add About"
        title="Add About"
        showFormLabel={true}
      />
    </div>
  );
};

export default SectionAbout;
