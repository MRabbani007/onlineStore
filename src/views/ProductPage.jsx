import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Components
import Navbar from "../components/Navbar";
// Imported Data
import { fetchProduct, fetchCart } from "../data/productServerFunctions";
import {
  genRatings,
  genPrice,
  getSelectProperties,
  parseImageColor,
} from "../data/productFunctions";
import { IMAGE_URL } from "../data/utils";
// Imported Icons
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const ProductPage = () => {
  // User information
  const [userName, setUserName] = useState("");
  // Store Product Displayed
  const [product, setProduct] = useState([]);
  // Store Product Properties & Values
  const [productProperties, setProductProperties] = useState([]);
  const [productValues, setProductValues] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [mainImage, setMainImage] = useState(false);
  const [stars, setStars] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });
  // Store Cart Information
  const [cart, setCart] = useState([]);
  // Store Selected Product
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [showID, setShowID] = useState(false);
  // Page Navigation
  const location = useLocation();
  const navigate = useNavigate();

  const handleEdit = (productID) => {
    navigate("/storeapi", { state: { productID: productID } });
  };

  const fetchProductID = async (productID) => {
    let temp = await fetchProduct(productID);
    setProduct(temp);
  };

  // set main image on thumb hover
  const handleThumbHover = (index) => {
    setMainImage(productImages[index]);
  };

  // add property to selected product
  const addproperty = (property, value) => {
    setSelectedProduct((currentSelectedProduct) => {
      // if not selected create new selected product
      if (currentSelectedProduct.length === 0) {
        return {
          id: product.id,
          name: product.name,
          property: [property],
          value: [value],
          quantity: 1,
        };
      } else {
        // push property to selected product
        let propIndex = currentSelectedProduct.property.findIndex(
          (prop) => prop === property
        );
        if (propIndex >= 0) {
          currentSelectedProduct.value[propIndex] = value;
        } else {
          currentSelectedProduct.property.push(property);
          currentSelectedProduct.value.push(value);
        }
        return { ...currentSelectedProduct };
      }
    });
  };

  // Fetch cart from server
  const handleCart = async (cartOption, cartData) => {
    try {
      await fetchCart(cartOption, userName, cartData).then((responseData) => {
        setCart(() => {
          return responseData;
        });
      });
    } catch (error) {
      console.log("Error: Fetch Cart");
    }
  };

  // add selected product to cart
  const handleAddToCart = async () => {
    let propertiesSelected = true;
    let required = "";
    await selectedProduct.value.map((val, index) => {
      if (val === "") {
        propertiesSelected = false;
        required = required + selectedProduct.property[index] + " ";
      } else {
      }
    });
    if (propertiesSelected) {
      handleCart("add", selectedProduct);
      alert("added " + selectedProduct.name);
    } else {
      alert("Select " + required);
    }
  };

  // Add selected image & color
  const handleImage = (image, imageName) => {
    addproperty("image", image);
    addproperty("color", imageName);
  };

  // check if property value is selected
  const isSelected = (propertyValue, property = "") => {
    if (property === "image") {
      property = "color";
      propertyValue = parseImageColor(product, propertyValue);
    }
    let selected = selectedProduct.value.findIndex(
      (value) => value === propertyValue
    );
    if (selected < 0) {
      return false;
    } else {
      return true;
    }
  };

  // Set username
  useEffect(() => {
    let data = localStorage.getItem("sleekUser");
    if (!!data) {
      setUserName(JSON.parse(data).username);
    }
  }, []);

  // Load Product
  useEffect(() => {
    // check if user redirected to display a product
    if (location.state) {
      fetchProductID(location.state.productID);
    }
  }, []);

  // Load Product properties & values
  useEffect(() => {
    if (product && typeof product !== "undefined" && product.length !== 0) {
      setProductProperties(product.properties);
      setProductValues(product.values);
      setProductImages(product.images[0]);
      setMainImage(product.images[0][0]);
      setStars(genRatings(product));
      setRatings(product.rating.count);
      setPrice(genPrice(product.priceCents));
      // initiate selected product to be added to cart
      let requiredProps = getSelectProperties(product);
      setSelectedProduct({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        property: [...requiredProps],
        value: Array(requiredProps.length).fill(""),
        quantity: 1,
      });
    }
  }, [product]);

  return (
    <>
      <Navbar pageCart={cart} />
      <div className="w-full min-h-screen pt-[80px] text-slate-950 flex md:flex-nowrap flex-wrap px-5 gap-5">
        {product.length === 0 ? null : (
          <>
            {/* Left Column: images */}
            <div className="md:w-[30%] w-full flex">
              <div className="mr-4 flex flex-col gap-2">
                {productImages.length !== 0 &&
                  productImages.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={IMAGE_URL + image}
                        className="image-thumb-sq"
                        onMouseOver={() => handleThumbHover(index)}
                      />
                    );
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
              <header className="bg-slate-200 p-3">
                <div className="font-semibold text-2xl">
                  {product.length !== 0 && product.name}
                  <MdEdit
                    className="btn-add"
                    onClick={() => {
                      handleEdit(product.id);
                      // setShowID(!showID);
                    }}
                  />
                </div>
                {showID && <span>{product.id}</span>}
                <div>Visit the {product.length !== 0 && product.supplier}</div>
                <div className="flex justify-between items-center">
                  <div className="text-yellow-500 text-2xl flex items-center">
                    <span className="text-slate-950 mr-2">
                      {product.length !== 0 && product.rating.stars}
                    </span>
                    {stars.length !== 0 &&
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
                    <span>
                      {ratings.toLocaleString("en-US") + " Ratings, "}
                    </span>
                    <span>
                      {product.length !== 0 &&
                        product.reviews.toLocaleString("en-US") + " Reviews"}
                    </span>
                  </div>
                </div>
              </header>
              <div className="p-3">
                <div className="">
                  <span className="text-2xl">{"$" + priceWhole}</span>
                  <span className="align-super">{priceFraction}</span>
                </div>
                <div>Ships to Kazakhstan</div>
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <div>
                  {productProperties.length !== 0 &&
                    productProperties.map((property, index) => {
                      return (
                        <div key={index}>
                          {property === "image" ? (
                            ""
                          ) : (
                            <h3 className="text-slate-950 text-xl font-semibold my-2 ml-2">
                              {property}
                            </h3>
                          )}
                          {property !== "image"
                            ? productValues.length &&
                              productValues[index].map((value, idx) => {
                                if (isSelected(value)) {
                                  return (
                                    <div
                                      key={idx}
                                      className="inline-block mx-2 my-1 border-[2px] border-yellow-500 p-1 cursor-pointer"
                                    >
                                      {value}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={idx}
                                      className="inline-block mx-2 my-1 border-[1px] p-1"
                                      onClick={() =>
                                        addproperty(property, value)
                                      }
                                    >
                                      {value}
                                    </div>
                                  );
                                }
                              })
                            : property === "color"
                            ? ""
                            : property === "image" &&
                              productValues.length &&
                              productValues[index].map((value, idx) => {
                                if (isSelected(value, property)) {
                                  return (
                                    <img
                                      src={IMAGE_URL + value}
                                      className="inline-block border-[2px] border-yellow-500 p-1 mx-2 my-1 w-[50px]"
                                      key={idx}
                                      title={""}
                                    />
                                  );
                                } else {
                                  return (
                                    <img
                                      src={IMAGE_URL + value}
                                      className="inline-block border-[1px] p-1 mx-2 my-1 w-[50px]"
                                      key={idx}
                                      title={""}
                                      onClick={() =>
                                        handleImage(property, value)
                                      }
                                    />
                                  );
                                }
                              })}
                        </div>
                      );
                    })}
                  <h3 className="text-slate-950 text-xl font-semibold my-2 ml-2">
                    {product.imagesBasedOn}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.images &&
                      product.images.map((imageArray, index) => {
                        return (
                          <div key={index}>
                            <img
                              src={IMAGE_URL + imageArray[0]}
                              className="image-thumb"
                              alt={product.imagesNames[index]}
                              title={product.imagesNames[index]}
                              onClick={() => {
                                setProductImages(product.images[index]);
                                setMainImage(product.images[index][0]);
                                handleImage(
                                  product.images[index][0],
                                  product.imagesNames[index]
                                );
                              }}
                            />
                            {/* <p className="text-slate-500">
                              {product.imagesNames[index]}
                            </p> */}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <h2 className="text-2xl font-semibold">Details</h2>
                <ul>
                  {!!product.details &&
                    product.details.map((item, index) => {
                      return (
                        <li className="list-disc list-inside" key={index}>
                          {item.name + ": " + item.value}
                        </li>
                      );
                    })}
                </ul>
                <h2 className="text-2xl font-semibold">About</h2>
                <ul>
                  {!!product.about &&
                    product.about.map((item, index) => {
                      return (
                        <li className="list-disc list-inside" key={index}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            {/* Right Column: Checkout */}
            <div className="md:w-[20%] w-full h-fit border-[1px]">
              <h2 className="text-xl text-center bg-slate-300 py-1">
                Checkout
              </h2>
              <div>
                <span className="text-2xl">{"$" + priceWhole}</span>
                <span className="align-super">{priceFraction}</span>
                {/* TODO: Remove */}
                {/* <p className="text-pretty">
                  {!!selectedProduct &&
                    JSON.stringify(selectedProduct).replaceAll(",", ", ")}
                </p> */}
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
