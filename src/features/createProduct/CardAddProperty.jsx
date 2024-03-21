import { useState } from "react";
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
    <div className="flex items-stretch gap-4">
      <DropDownOptions
        title="Add New Property"
        options={propertyOptions}
        selectedValue={propDropDown}
        handleSelected={handleSelectedProperty}
      />
      {propDropDown === "other" && (
        <div className="field">
          <label htmlFor="property_input">New Property</label>
          <input
            id="property_input"
            name="property_input"
            type="text"
            placeholder="Property Name"
            value={newPropertyInput}
            onChange={(e) => setNewPropertyInput(e.target.value)}
            className="field__input"
          />
        </div>
      )}
      <button className="btn btn-green" onClick={handleAddProperty}>
        Add Property
      </button>
    </div>
  );
};

export default CardAddProperty;
