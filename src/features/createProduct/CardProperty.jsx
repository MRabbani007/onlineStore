import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import { FaTimes } from "react-icons/fa";
import CardAddItem from "./CardAddItem";

const CardProperty = ({ property, values, propIndex }) => {
  const { dispatch } = useProduct();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const handlePropertyRemove = () => {
    dispatch({ type: PRODUCT.PROPERTIES_REMOVE, payload: propIndex });
  };
  const handleValueRemove = (valueIndex) => {
    dispatch({
      type: PRODUCT.VALUES_REMOVE,
      payload: { propIndex, valueIndex },
    });
  };

  return (
    <div>
      {/* Property Name */}
      <h3 className="text-xl font-semibold my-2 ml-2 edit-item">
        {property}
        <FaTimes
          onClick={handlePropertyRemove}
          className="btn-remove invisible"
        />
      </h3>
      {/* Values */}
      <div>
        {Array.isArray(values) &&
          values.map((value, idx) => {
            return (
              <div
                key={idx}
                className="inline-block mx-2 my-1 border-[1px] p-1 edit-cont"
              >
                <span>{value}</span>
                <FaTimes
                  onClick={() => handleValueRemove(idx)}
                  className="btn-remove invisible"
                />
              </div>
            );
          })}
        <CardAddItem type={PRODUCT.VALUES_ADD} data={propIndex} />
      </div>
    </div>
  );
};

export default CardProperty;
