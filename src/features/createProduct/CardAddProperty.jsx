import React, { useState } from "react";
import DropDownOptions from "../../components/DropDownOptions";
import { propertyOptions } from "../../data/departments";
import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";

const CardAddProperty = () => {
  const { dispatch } = useProduct();

  const [newPropertyInput, setNewPropertyInput] = useState("");
  const [propDropDown, setPropDropDown] = useState(propertyOptions[0]);

  const handleSelectedProperty = (value) => {
    setPropDropDown(value);
  };

  const handleAddProperty = () => {
    if (propDropDown === "other" && newPropertyInput !== "") {
      dispatch({ type: PRODUCT.PROPERTIES_ADD, payload: newPropertyInput });
    } else {
      dispatch({ type: PRODUCT.PROPERTIES_ADD, payload: propDropDown });
    }
  };

  return (
    <div className="flex gap-4">
      <DropDownOptions
        title="Properties"
        options={propertyOptions}
        selectedValue={propDropDown}
        handleSelected={handleSelectedProperty}
      />
      {propDropDown === "other" && (
        <input
          name="property-input"
          type="text"
          placeholder="Property Name"
          value={newPropertyInput}
          onChange={(e) => setNewPropertyInput(e.target.value)}
          className=""
        />
      )}
      <button className="btn btn-green" onClick={handleAddProperty}>
        New Property
      </button>
    </div>
  );
};

export default CardAddProperty;
