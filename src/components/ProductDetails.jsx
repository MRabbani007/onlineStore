import React, { useRef, useState } from "react";
// Imported Icons
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";

const ProductDetails = ({ about, handleAbout, details, handleDetails }) => {
  const [view, setView] = useState(true);
  const aboutInput = useRef();
  const detailNameInput = useRef();
  const detailValueInput = useRef();

  const [viewInputBlock, setViewInputBlock] = useState(false);

  return (
    <div>
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Details
      </h2>

      <div className={(view ? "block" : "hidden") + " p-2"}>
        {/* Product About */}
        <h2 className="flex items-center">About</h2>
        <ul className="">
          {about.length !== 0 &&
            about.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row items-center edit-cont"
                >
                  {item}
                  <FaTimes
                    className="btn-remove invisible"
                    onClick={() => handleAbout("remove", index)}
                  />
                </li>
              );
            })}
        </ul>
        <div className="flex items-center">
          {viewInputBlock ? (
            <FaMinusCircle
              className="btn-add"
              onClick={() => setViewInputBlock(!viewInputBlock)}
            />
          ) : (
            <FaPlusCircle
              className="btn-add"
              onClick={() => setViewInputBlock(!viewInputBlock)}
            />
          )}
          <div
            className={
              (viewInputBlock ? "flex" : "hidden") + " input-block-row"
            }
          >
            <label htmlFor="about">Item</label>
            <input
              ref={aboutInput}
              name="about"
              type="text"
              placeholder="Item"
              className="outline-none border-[1px] border-slate-400"
            />
            <FaPlus
              className="btn-add"
              onClick={() => handleAbout("add", aboutInput.current.value)}
            />
          </div>
        </div>
        {/* Product Details */}
        <h2>Details</h2>
        <p>Brand, Material, ItemWeight...</p>
        <ul className="">
          {!!details &&
            details.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row items-center edit-cont"
                >
                  <span>{item.name + ": "}</span>
                  <span>{item.value}</span>
                  <FaTimes
                    className="btn-remove invisible"
                    onClick={() => handleDetails("remove", index)}
                  />
                </li>
              );
            })}
        </ul>
        <div className="input-block-row">
          <label htmlFor="detailname">Name</label>
          <input
            name="detailname"
            type="text"
            ref={detailNameInput}
            placeholder="Name"
            className="outline-none border-[1px] border-slate-400"
          />
          <label htmlFor="detaildesc">Detail</label>
          <input
            ref={detailValueInput}
            name="detaildesc"
            type="text"
            placeholder="Detail"
            className="outline-none border-[1px] border-slate-400"
          />
          <FaPlus
            className="btn-add"
            onClick={() =>
              handleDetails(
                "add",
                detailNameInput.current.value,
                detailValueInput.current.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
