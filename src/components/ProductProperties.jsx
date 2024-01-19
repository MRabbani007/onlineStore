import React, { useState } from "react";
// Imported Components
import DropDownOptions from "./DropDownOptions";
// Imported Data
import { propertyOptions } from "../data/departments";
// Imported Icons
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductProperties = ({ properties, values, handleProperties }) => {
  // Control view of section
  const [view, setView] = useState(true);
  // Store user input
  const [newPropertyInput, setNewPropertyInput] = useState("");
  const [propDropDown, setPropDropDown] = useState(propertyOptions[0]);
  const [addValuesIndex, setAddValuesIndex] = useState(null);
  const [valuesInput, setValuesInput] = useState("");

  const [editItem, setEditItem] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editData, setEditData] = useState("");

  const [val, setVal] = useState("");
  const [prop, setProp] = useState(propertyOptions[0]);

  const handlePropChange = (propertyName) => {
    setProp(propertyName);
    setNewPropertyInput("");
  };

  const handleSelectedProperty = (value) => {
    setPropDropDown(value);
  };

  const handleAddProperty = () => {
    if (newPropertyInput === "") {
      handleProperties("addProperty", propDropDown);
    } else {
      handleProperties("addProperty", newPropertyInput);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Properties
      </h2>
      <div className={(view ? "flex flex-col" : "hidden") + " p-2"}>
        {/* Header */}
        <div className="flex gap-4">
          <DropDownOptions
            title="Properties"
            options={propertyOptions}
            selectedValue={propDropDown}
            handleSelected={handleSelectedProperty}
          />
          <button className="btn btn-green" onClick={() => handleAddProperty()}>
            New Property
          </button>
          <div className="input-block-row">
            <label htmlFor="property-input">Other:</label>
            <input
              name="property-input"
              type="text"
              value={newPropertyInput}
              onChange={(e) =>
                setNewPropertyInput(() => {
                  return e.target.value;
                })
              }
              placeholder="Value"
              className="outline-none border-[1px] border-slate-400"
            />
          </div>
        </div>
        {/* Edit Block */}
        <div className={editItem === "" ? "hidden" : "input-block-row"}>
          <label htmlFor="edit-input">
            {editItem || "Select Item To Edit"}
          </label>
          <input
            name="edit-input"
            type="text"
            value={editInput}
            onChange={(e) =>
              setEditInput(() => {
                return e.target.value;
              })
            }
            placeholder="Value"
            className="outline-none border-[1px] border-slate-400"
          />
          <span>
            <button
              className="btn btn-yellow mx-2"
              onClick={() => {
                handleProperties(
                  editItem,
                  editData.data1,
                  editData.data2,
                  editInput
                );
              }}
            >
              Apply
            </button>
            <button
              className="btn btn-slate"
              onClick={() => {
                setEditInput("");
                setEditItem("");
                setEditData(null);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
        <div>
          {!!properties &&
            properties.map((property, index) => {
              return (
                <div key={index}>
                  <h3
                    onClick={() => {
                      setEditItem("editPropName");
                      setEditData(() => {
                        return { data1: index, data2: editInput };
                      });
                    }}
                    className="text-xl font-semibold my-2 ml-2 edit-item"
                  >
                    {property}
                    <FaTimes
                      onClick={() => handleProperties("removeProperty", index)}
                      className="btn-remove invisible"
                    />
                  </h3>
                  {/* Values */}
                  <div>
                    {values.length &&
                      values[index].map((value, idx) => {
                        return (
                          <div
                            key={idx}
                            className="inline-block mx-2 my-1 border-[1px] p-1 edit-cont"
                          >
                            <span
                              onClick={() => {
                                setEditItem("editValue");
                                setEditData({
                                  data1: index,
                                  data2: idx,
                                });
                              }}
                            >
                              {value}
                            </span>
                            <FaTimes
                              onClick={() =>
                                handleProperties("removeValue", index, idx)
                              }
                              className="btn-remove invisible"
                            />
                          </div>
                        );
                      })}
                    <span>
                      {index === addValuesIndex ? (
                        <FaMinusCircle
                          onClick={() => {
                            if (addValuesIndex === index) {
                              setAddValuesIndex(null);
                            } else {
                              setAddValuesIndex(index);
                            }
                          }}
                          className="btn-add"
                        />
                      ) : (
                        <FaPlusCircle
                          onClick={() => {
                            if (addValuesIndex === index) {
                              setAddValuesIndex(null);
                            } else {
                              setAddValuesIndex(index);
                            }
                          }}
                          className="btn-add"
                        />
                      )}
                      {/* Input block to add values to property */}
                      {index !== addValuesIndex ? null : (
                        <>
                          <input
                            className="border-2"
                            type="text"
                            value={valuesInput}
                            onChange={(e) => setValuesInput(e.target.value)}
                          />
                          <FaPlus
                            className="btn-add"
                            onClick={() =>
                              handleProperties("addValue", index, valuesInput)
                            }
                          />
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductProperties;
