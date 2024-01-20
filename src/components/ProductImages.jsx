import React, { useState } from "react";
// Imported Data
import { IMAGE_URL } from "../data/utils";
// Imported Icons
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdEdit, MdFileUpload } from "react-icons/md";

const ProductImages = ({
  images,
  imagesNames,
  imageReference,
  handleImage,
  setProductImages,
  setMainImage,
}) => {
  // Control view of section
  const [view, setView] = useState(true);
  // Control edit input
  const [addImageIndex, setAddImageIndex] = useState(null);
  const [imageInput, setImageInput] = useState("");

  const [editItem, setEditItem] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editData, setEditData] = useState("");

  return (
    <div className="">
      {/* Header */}
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Images
      </h2>
      <div className={(view ? "flex flex-col" : "hidden") + " p-2"}>
        {/* Header */}
        <div>
          <span>Images based on: </span>
          <span
            className="edit-item"
            onClick={() => setEditItem("imageReference")}
          >
            {imageReference}
          </span>
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
                handleImage(
                  editItem,
                  editData.imageArrayIndex,
                  editData.imageIndex,
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
          {images.length !== 0 &&
            images.map((imageArray, index) => {
              return (
                <div key={"imageArray-" + index} className="flex gap-2 my-2">
                  <h3>
                    <span
                      className="edit-item"
                      onClick={() => {
                        setEditItem("imageArrayName");
                        setEditData({
                          imageArrayIndex: index,
                        });
                      }}
                    >
                      {!!imagesNames && imagesNames[index]}
                      <FaTimes
                        className="btn-remove invisible"
                        onClick={() => handleImage("removeImageArray", index)}
                      />
                    </span>
                    <MdFileUpload
                      className="cursor-pointer inline"
                      onClick={() => {
                        setProductImages(images[index]);
                        setMainImage(images[index][0]);
                      }}
                    />
                  </h3>
                  {imageArray.length !== 0 &&
                    imageArray.map((image, idx) => {
                      if (image === "") {
                        return (
                          <div
                            key={"image-" + idx}
                            onClick={() => {
                              setEditItem("editImage");
                              setEditData({
                                imageArrayIndex: index,
                                imageIndex: idx,
                              });
                            }}
                            className="image-thumb"
                          >
                            <MdEdit className="inline text-blue-800" />
                            <FaTimes
                              className="btn-remove invisible"
                              onClick={() =>
                                handleImage("removeImage", index, idx)
                              }
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={"image-" + idx}
                            className="relative edit-cont"
                          >
                            <img
                              src={IMAGE_URL + image}
                              className="image-thumb"
                              onClick={() => {
                                setEditItem("editImage");
                                setEditData({
                                  imageArrayIndex: index,
                                  imageIndex: idx,
                                });
                              }}
                            />
                            <FaTimes
                              className="btn-remove absolute top-0 right-0 invisible"
                              onClick={() =>
                                handleImage("removeImage", index, idx)
                              }
                            />
                          </div>
                        );
                      }
                    })}
                  {/* Input Block */}
                  <span>
                    {index === addImageIndex ? (
                      <FaMinusCircle
                        className="btn-add"
                        onClick={() => {
                          if (addImageIndex === index) {
                            setAddImageIndex(null);
                          } else {
                            setAddImageIndex(index);
                          }
                        }}
                      />
                    ) : (
                      <FaPlusCircle
                        className="btn-add"
                        onClick={() => {
                          if (addImageIndex === index) {
                            setAddImageIndex(null);
                          } else {
                            setAddImageIndex(index);
                          }
                        }}
                      />
                    )}
                    {index !== addImageIndex ? null : (
                      <>
                        <input
                          className="border-2"
                          type="text"
                          value={imageInput}
                          onChange={(e) => setImageInput(e.target.value)}
                        />
                        <FaPlus
                          className="btn-add"
                          onClick={() =>
                            handleImage("addImage", index, imageInput)
                          }
                        />
                      </>
                    )}
                  </span>
                </div>
              );
            })}
        </div>
        <button
          onClick={() => handleImage("addImageArray")}
          className="btn btn-slate"
        >
          add image array
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
