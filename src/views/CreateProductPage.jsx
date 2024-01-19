import React, { useEffect, useState } from "react";
// Imported Components
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import ProductProperties from "../components/ProductProperties";
// Imported Data
import { IMAGE_URL } from "../data/utils";
import { genRatings, getProductPrice } from "../data/productFunctions";
// Imported Icons
import { MdEdit } from "react-icons/md";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { FaMinusCircle, FaPlus, FaPlusCircle, FaTimes } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import ProductImages from "../components/ProductImages";
import {
  fetchCreateProduct,
  fetchProduct,
  fetchUpdateProduct,
} from "../data/productServerFunctions";
import DropDownOptions from "../components/DropDownOptions";
import { categoryOptions } from "../data/departments";
import { useLocation } from "react-router-dom";

// Template for creating new product
const newProduct = {
  id: crypto.randomUUID(),
  name: "new product",
  category: "category",
  rating: {
    stars: 4.5,
    count: 10,
  },
  reviews: 0,
  priceCents: 0,
  supplier: "supplier",
  properties: ["Size", "Style", "Model", "Color"],
  values: [["Size"], ["Style"], ["Model"], ["Color"]],
  imagesBasedOn: "",
  images: [[""]],
  imagesNames: [],
  about: ["About this product"],
  details: [],
};

const CreateProductPage = () => {
  const [product, setProduct] = useState(() => {
    return newProduct;
  });

  const [loadEditProduct, setLoadEditProduct] = useState("");
  const location = useLocation();

  // Store Product Properties & Values
  const [stars, setStars] = useState([]);
  const [productImages, setProductImages] = useState(["", "", ""]);
  const [mainImage, setMainImage] = useState("");
  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  const [editItem, setEditItem] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editData, setEditData] = useState("");

  const [category, setCategory] = useState(
    product.category || categoryOptions[0]
  );

  const handleCategoryChange = (value) => {
    setProduct((currentProduct) => {
      return { ...currentProduct, category: value };
    });
  };

  useEffect(() => {
    if (location.state) {
      setLoadEditProduct(location.state.productID);
    }
  }, []);

  // Load Product properties & values
  useEffect(() => {
    if (!!product) {
      setProduct((currentProduct) => {
        if (!currentProduct.imagesBasedOn) {
          return {
            ...currentProduct,
            imagesBasedOn: "color",
            imagesNames: Array(currentProduct.images.length).fill(
              "image array"
            ),
          };
        }
        return currentProduct;
      });
      setStars(genRatings(product));
      setPrice(getProductPrice(product));
      if (!!product.images) {
        setProductImages(product.images[0]);
        setMainImage(product.images[0][0]);
      }
      // setCategory(() => {
      //   return product.category;
      // });
    }
  }, [product]);

  const handleEditSubmit = () => {
    if (editInput === "") {
      return;
    }
    switch (editItem) {
      case "name": {
        setProduct((currentProduct) => {
          return { ...currentProduct, name: editInput };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      case "supplier": {
        setProduct((currentProduct) => {
          return { ...currentProduct, supplier: editInput };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      case "rating_stars": {
        setProduct((currentProduct) => {
          currentProduct.rating.stars = editInput;
          return {
            ...currentProduct,
          };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      case "rating_count": {
        setProduct((currentProduct) => {
          currentProduct.rating.count = editInput;
          return {
            ...currentProduct,
          };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      case "reviews": {
        setProduct((currentProduct) => {
          return { ...currentProduct, reviews: editInput };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      case "priceCents": {
        setProduct((currentProduct) => {
          return { ...currentProduct, priceCents: editInput };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      default: {
      }
    }
  };

  const handleAbout = (callType, data) => {
    switch (callType) {
      case "add": {
        setProduct((currentProduct) => {
          currentProduct.about.push(data);
          return { ...currentProduct };
        });
        break;
      }
      case "remove": {
        setProduct((currentProduct) => {
          currentProduct.about.splice(data, 1);
          return { ...currentProduct };
        });
        break;
      }
      default: {
      }
    }
  };

  const handleDetails = (callType, data1 = "", data2 = "", data3 = "") => {
    switch (callType) {
      // Add new item
      case "add": {
        setProduct((currentProduct) => {
          if (!currentProduct.details) {
            let details = [{ name: data1, value: data2 }];
            return { ...currentProduct, details: details };
          } else {
            currentProduct.details.push({ name: data1, value: data2 });
            return { ...currentProduct };
          }
        });
        break;
      }
      // Remove item
      case "remove": {
        setProduct((currentProduct) => {
          currentProduct.details.splice(data1, 1);
          return { ...currentProduct };
        });
        break;
      }
      // Update item
      case "update": {
        setProduct((currentProduct) => {
          currentProduct.details.splice(data1, 1, {
            name: data2,
            value: data3,
          });
          return { ...currentProduct };
        });
        break;
      }
      default: {
      }
    }
  };

  const handleImage = (operation, imageArrayIndex, imageIndex, image) => {
    switch (operation) {
      case "addImage": {
        setProduct((currentProduct) => {
          currentProduct.images[imageArrayIndex].push(imageIndex);
          return { ...currentProduct };
        });
        break;
      }
      case "editImage": {
        setProduct((currentProduct) => {
          currentProduct.images[imageArrayIndex][imageIndex] = image;
          return { ...currentProduct };
        });
        break;
      }
      case "removeImage": {
        setProduct((currentProduct) => {
          currentProduct.images[imageArrayIndex].splice(imageIndex, 1);
          return { ...currentProduct };
        });
        break;
      }
      case "addImageArray": {
        setProduct((currentProduct) => {
          currentProduct.images.push(["Image Array"]);
          currentProduct.imagesNames.push("Image Array");
          return { ...currentProduct };
        });
        break;
      }
      case "imageArrayName": {
        setProduct((currentProduct) => {
          currentProduct.imagesNames[imageArrayIndex] = image;
          return { ...currentProduct };
        });
        break;
      }
      case "removeImageArray": {
        setProduct((currentProduct) => {
          currentProduct.images.splice(imageArrayIndex, 1);
          currentProduct.imagesNames.splice(imageArrayIndex, 1);
          return { ...currentProduct };
        });
        break;
      }
      case "imageReference": {
        setProduct((currentProduct) => {
          return { ...currentProduct, imagesBasedOn: image };
        });
        setEditItem("");
        setEditInput("");
        break;
      }
      default: {
      }
    }
  };

  const handleProperties = (operation, data1, data2, data3) => {
    switch (operation) {
      case "addProperty": {
        setProduct((currentProduct) => {
          currentProduct.properties.push(data1);
          currentProduct.values.push([]);
          return { ...currentProduct };
        });
        break;
      }
      case "removeProperty": {
        setProduct((currentProduct) => {
          currentProduct.properties.splice(data1, 1);
          currentProduct.values.splice(data1, 1);
          return { ...currentProduct };
        });
        break;
      }
      case "editPropName": {
        setProduct((currentProduct) => {
          currentProduct.properties[data1] = data2;
          return { ...currentProduct };
        });
        break;
      }
      case "addValue": {
        setProduct((currentProduct) => {
          currentProduct.values[data1].push(data2);
          return { ...currentProduct };
        });
        break;
      }
      case "removeValue": {
        setProduct((currentProduct) => {
          currentProduct.values[data1].splice(data2, 1);
          return { ...currentProduct };
        });
        break;
      }
      case "editValue": {
        setProduct((currentProduct) => {
          currentProduct.values[data1][data2] = data3;
          return { ...currentProduct };
        });
        break;
      }
      default: {
      }
    }
  };

  // Create new product in DB
  const handleCreateProduct = () => {
    fetchCreateProduct(product);
  };

  // Update product in DB
  const handeApplyEdit = async () => {
    let temp = await fetchUpdateProduct(product);
    alert(temp);
  };

  // Fetch product from DB
  const handleFetchProduct = async () => {
    let temp = await fetchProduct(loadEditProduct);
    setProduct(temp);
  };

  // Load Product from local storage
  const loadProduct = () => {
    let temp = localStorage.getItem("product");
    if (temp) {
      setProduct(JSON.parse(temp));
    }
  };

  // Save Product to local storage
  const saveProduct = () => {
    localStorage.setItem("product", JSON.stringify(product));
    alert("Product Saved to localstorage");
  };

  // set main image on thumb hover
  const handleThumbHover = (index) => {
    setMainImage(productImages[index]);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <section className="flex flex-col items-center">
          <h1 className="text-center">Create New Product</h1>
          {/* Load Product from DB */}
          <div className="flex gap-2 items-center">
            <label htmlFor="productid" className="text-nowrap">
              Product ID:
            </label>
            <input
              name="productid"
              type="text"
              value={loadEditProduct}
              onChange={(e) => setLoadEditProduct(e.target.value)}
              className="border-[1px] border-slate-400 w-[350px] outline-none h-8"
            />
            <button
              className="btn btn-blue"
              onClick={() => handleFetchProduct()}
            >
              Fetch Product
            </button>
            <button className="btn btn-blue" onClick={() => handeApplyEdit()}>
              Apply Edit
            </button>
          </div>
          {/* Save to local Storage */}
          <div className="flex gap-2">
            <button onClick={() => loadProduct()} className="btn btn-slate">
              Load Product
            </button>
            <button onClick={() => saveProduct()} className="btn btn-slate">
              Save Product
            </button>
          </div>
          {/* Edit Block */}
          <div className="input-block-row">
            <label htmlFor="edit-input">
              {editItem ? editItem : "Select item to edit"}
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
            <button
              className="btn btn-yellow mx-2"
              onClick={() => handleEditSubmit()}
            >
              Save
            </button>
          </div>
        </section>
        <section className="flex lg:flex-nowrap flex-wrap gap-5 text-slate-950">
          {!product ? null : (
            <>
              {/* Left Column: images */}
              <div className="md:w-[30%] w-full flex gap-3">
                <div className="flex flex-col gap-2">
                  {productImages.length !== 0 &&
                    productImages.map((image, index) => {
                      if (image === "") {
                        return (
                          <div
                            key={index}
                            className="w-[60px] h-[60px] p-2 my-1 border-[1px] rounded-md"
                          >
                            + add image
                          </div>
                        );
                      } else {
                        return (
                          <img
                            key={index}
                            src={IMAGE_URL + image}
                            className="image-thumb"
                            onMouseOver={() => handleThumbHover(index)}
                          />
                        );
                      }
                    })}
                </div>
                <div className="w-[300px]">
                  {productImages.length !== 0 && (
                    <img src={IMAGE_URL + mainImage} alt="" />
                  )}
                </div>
              </div>
              {/* Middle Column: Product info */}
              <div className="md:flex-1 w-full border-[1px]">
                {/* Product Header */}
                <header className="bg-slate-200 p-3">
                  <div
                    className={"font-semibold text-2xl edit-item"}
                    onClick={() => setEditItem("name")}
                  >
                    {!!product && product.name}
                  </div>
                  <div>
                    Visit the{" "}
                    <span
                      className="edit-item"
                      onClick={() => setEditItem("supplier")}
                    >
                      {!!product && product.supplier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-yellow-500 text-2xl flex items-center">
                      <span
                        className="mr-2 edit-item"
                        onClick={() => setEditItem("rating_stars")}
                      >
                        {!!product && product.rating.stars}
                      </span>
                      {!!stars &&
                        stars.map((star, index) => {
                          return star === "f" ? (
                            <IoStar key={index} />
                          ) : star === "h" ? (
                            <IoStarHalf key={index} />
                          ) : (
                            <IoStarOutline key={index} />
                          );
                        })}
                    </div>
                    <div>
                      <span
                        onClick={() => setEditItem("rating_count")}
                        className="edit-item"
                      >
                        {!!product &&
                          product.rating.count.toLocaleString("en-US")}
                      </span>
                      <span>{" Ratings, "}</span>
                      <span
                        onClick={() => setEditItem("reviews")}
                        className="edit-item"
                      >
                        {!!product && product.reviews.toLocaleString("en-US")}
                      </span>
                      <span>{" Reviews"}</span>
                    </div>
                  </div>
                </header>
                {/* Product Body */}
                <div className="">
                  <div className="flex justify-between px-2 py-1">
                    <div className="">
                      <div
                        onClick={() => setEditItem("priceCents")}
                        className="edit-item"
                      >
                        <span className="text-2xl">{"$" + priceWhole}</span>
                        <span className="align-super">{priceFraction}</span>
                      </div>
                      <div>Ships to Kazakhstan</div>
                    </div>
                    <DropDownOptions
                      title={"category"}
                      options={categoryOptions}
                      selectedValue={product.category}
                      handleSelected={handleCategoryChange}
                    />
                  </div>
                  <h2 className="text-2xl font-semibold px-2">
                    Product Details
                  </h2>
                  <ProductProperties
                    properties={product.properties}
                    values={product.values}
                    handleProperties={handleProperties}
                  />
                  <ProductImages
                    images={product.images}
                    imagesNames={product.imagesNames}
                    imageReference={product.imagesBasedOn}
                    handleImage={handleImage}
                    setProductImages={setProductImages}
                    setMainImage={setMainImage}
                  />
                  <ProductDetails
                    about={product.about}
                    handleAbout={handleAbout}
                    details={product.details}
                    handleDetails={handleDetails}
                  />
                </div>
              </div>
              {/* Right Column: Checkout */}
              {/* <div className="md:w-[20%] w-full h-fit border-[1px]">
              <h2 className="text-xl text-center bg-slate-300 py-1">
                Checkout
              </h2>
              <div>
                <span className="text-2xl">{"$" + priceWhole}</span>
                <span className="align-super">{priceFraction}</span>
                 TODO: Remove 
                <p className="text-pretty">
                  {!!selectedProduct &&
                    JSON.stringify(selectedProduct).replaceAll(",", ", ")}
                </p>
              </div>
              <p>Ships to Kazakhstan</p>
              <p>No Import Fees &</p>
              <p>
                $
                {!!product &&
                  (Math.floor(product.priceCents / 100) * 0.1).toFixed(2)}{" "}
                Shipping
              </p>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-400 rounded-md py-1 px-3 my-2 w-[150px]"
                >
                  Add To Cart
                </button>
                <button className="bg-yellow-400 rounded-md py-1 px-3 my-2 w-[150px] text-blue-500">
                  Checkout
                </button>
              </div>
            </div> */}
            </>
          )}
        </section>
        <section className="flex justify-center my-2">
          <button
            className="btn btn-yellow"
            onClick={() => handleCreateProduct()}
          >
            Create Product
          </button>
        </section>
      </div>
    </>
  );
};

export default CreateProductPage;
