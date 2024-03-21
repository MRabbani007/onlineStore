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
    <div className="border-2 rounded-md p-2">
      {/* Property Name */}
      <h3 className="text-xl font-normal edit-item">
        {property}
        <FaTimes
          onClick={handlePropertyRemove}
          className="btn-remove invisible"
        />
      </h3>
      {/* Values */}
      <div className="flex flex-wrap items-center gap-2">
        {Array.isArray(values) &&
          values.map((value, idx) => {
            return (
              <div
                key={idx}
                className="inline-block border-[1px] rounded-md py-2 px-4 edit-cont relative text-center"
              >
                <span>{value}</span>
                <FaTimes
                  onClick={() => handleValueRemove(idx)}
                  className="btn-remove invisible absolute top-0 right-0"
                />
              </div>
            );
          })}
        <CardAddItem
          initialValue=""
          type={PRODUCT.VALUES_ADD}
          data={{ propIndex }}
        />
      </div>
    </div>
  );
};

export default CardProperty;
