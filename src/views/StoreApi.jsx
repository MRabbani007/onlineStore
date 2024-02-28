import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Imported Components
import ProductInfo from "../components/ProductInfo";
import ProductProperties from "../components/ProductProperties";
import ProductPreview from "../components/ProductPreview";

const StoreApi = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const navigate = useNavigate();

  const [pindex, setPIndex] = useState(0);

  // TODO: implement useReducer and remove
  // const [productName, setProductName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [stars, setStars] = useState("");
  // const [ratings, setRatings] = useState(0);
  // const [reviews, setRevews] = useState(0);
  // const [brand, setBrand] = useState("");
  // const [supplier, setSupplier] = useState("");

  const [productInfo, setProductInfo] = useState({
    productName: "",
    price: "",
    stars: "",
    ratings: "",
    reviews: "",
    brand: "",
    supplier: "",
  });

  const [values, setValues] = useState([["value"]]);
  const [properties, setProperties] = useState(["property"]);
  const [arrayProperties, setArrayProperties] = useState([]);
  const [about, setAbout] = useState([]);
  const [details, setDetails] = useState([]);

  const handleClick = (productID) => {
    navigate("/product", { state: { productID: productID } });
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const fetchProducts = async () => {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:3000/products/all",
        data: { page: page },
      });
      if (response.data) {
        setProducts(response.data.products);
        setProductCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductInfo = (property, value) => {
    setProductInfo((currentProductInfo) => {
      switch (property) {
        case "productName": {
          return { ...currentProductInfo, productName: value };
          break;
        }
        case "price": {
          return { ...currentProductInfo, price: value };
          break;
        }
        case "stars": {
          return { ...currentProductInfo, stars: value };
          break;
        }
        case "ratings": {
          return { ...currentProductInfo, ratings: value };
          break;
        }
        case "reviews": {
          return { ...currentProductInfo, reviews: value };
          break;
        }
        case "brand": {
          return { ...currentProductInfo, brand: value };
          break;
        }
        case "supplier": {
          return { ...currentProductInfo, supplier: value };
          break;
        }
        default:
          return currentProductInfo;
      }
    });
  };

  const handleAddValue = (propIndex) => {
    setValues((currentValues) => {
      currentValues[propIndex] = [...currentValues[propIndex], ""];
      return [...currentValues];
    });
  };

  const handleAddProperty = (propertyName) => {
    setProperties((currentProperties) => {
      currentProperties.push(propertyName);
      return currentProperties;
    });
    setValues((currentValues) => {
      return [...currentValues, [""]];
    });
  };

  const handleAddArrayProperty = () => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties.push({ prop: "", value: [[]] });
      return [...currentArrayProperties];
    });
  };

  const handleAddValueToArray = (propertyIndex, valueIndex, value) => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties[propertyIndex].value[valueIndex].push(value);
      return [...currentArrayProperties];
    });
    console.log(arrayProperties);
  };

  const handleArrayPropertyChange = (propertyIndex, value) => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties[propertyIndex].prop = value;
      return [...currentArrayProperties];
    });
  };

  const handleRemoveArrayProperty = (propertyIndex) => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties.splice(propertyIndex, 1);
      return [...currentArrayProperties];
    });
  };

  const handleRemoveValuesArray = (propertyIndex, valueIndex) => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties[propertyIndex].value.splice(valueIndex, 1);
      return [...currentArrayProperties];
    });
  };

  const handleAddValueArray = (propertyIndex) => {
    setArrayProperties((currentArrayProperties) => {
      currentArrayProperties[propertyIndex].value.push([]);
      return [...currentArrayProperties];
    });
  };

  const handleRemoveProperty = (index) => {
    setProperties((currentProperties) => {
      currentProperties.splice(index, 1);
      return [...currentProperties];
    });
    setValues((currentValues) => {
      currentValues.splice(index, 1);
      return [...currentValues];
    });
  };

  const handleRemoveValue = (propIndex, valueIndex) => {
    setValues((currentValues) => {
      currentValues[propIndex].splice(valueIndex, 1);
      return [...currentValues];
    });
  };

  const addAbout = (inputText) => {
    setAbout((currentAbout) => [...currentAbout, inputText]);
  };

  // TODO: implement delete about
  const deleteAbout = (index) => {};

  const handlePropertyChange = (value, propertyIndex) => {
    setProperties((currentProperties) => {
      currentProperties[propertyIndex] = value;
      return [...currentProperties];
    });
  };

  const handleValueChange = (value, propertyIndex, valueIndex) => {
    setValues((currentValues) => {
      currentValues[propertyIndex][valueIndex] = value;
      return [...currentValues];
    });
  };

  const generateProduct = () => {
    let newProduct = {
      id: crypto.randomUUID(),
      name: productInfo.productName,
      priceCents: productInfo.price,
      rating: {
        stars: productInfo.stars,
        count: productInfo.ratings,
      },
      reviews: productInfo.reviews,
      supplier: productInfo.supplier,
      variants: [[]],
      brand: productInfo.brand,
      Material: "",
      colorInitial: "",
      AgeRange: "",
      itemWeight: 0,
      itemWeightUnit: "",
      about: about,
      delivery: {
        periodUnit: "week",
        periodFrom: 1,
        periodTo: 2,
      },
      details: details,
    };
    properties.map((property, index) => {
      newProduct.variants[0].push({
        prop: property,
        value: values[index],
      });
    });
    arrayProperties.map((property) => {
      newProduct.variants[0].push({
        prop: property.prop,
        value: property.value,
      });
    });
    console.log(newProduct);
    return newProduct;
  };

  const handleFormSubmit = async () => {
    // event.preventDefault();
    // let newProduct = generateProduct();
  };

  const addDetail = (name, value) => {
    setDetails((currentDetails) => {
      return [
        ...currentDetails,
        {
          name: name,
          value: value,
        },
      ];
    });
  };

  // TODO: implement delete detail
  const deleteDetail = (index) => {};

  useEffect(() => {
    // fetchProducts();
  }, []);

  return (
    <>
      <div className="page-container">
        <h1 className="text-center">Create New Product</h1>
        <div className="flex flex-wrap justify-center gap-5 min-h-screen">
          <ProductPreview
            productInfo={productInfo}
            properties={properties}
            arrayProperties={arrayProperties}
            values={values}
            details={details}
            about={about}
          />
          {/* Product Information */}
          <ProductInfo
            productInfo={productInfo}
            handleProductInfo={handleProductInfo}
          />
          {/* Properties */}
          <ProductProperties
            properties={properties}
            values={values}
            arrayProperties={arrayProperties}
            handleAddProperty={handleAddProperty}
            handleRemoveProperty={handleRemoveProperty}
            handleAddValue={handleAddValue}
            handleRemoveValue={handleRemoveValue}
            handlePropertyChange={handlePropertyChange}
            handleValueChange={handleValueChange}
            handleAddArrayProperty={handleAddArrayProperty}
            handleAddValueToArray={handleAddValueToArray}
            handleArrayPropertyChange={handleArrayPropertyChange}
            handleRemoveArrayProperty={handleRemoveArrayProperty}
            handleAddValueArray={handleAddValueArray}
            handleRemoveValuesArray={handleRemoveValuesArray}
          />
          {/* Details */}
          <ProductDetails
            about={about}
            addAbout={addAbout}
            deleteAbout={deleteAbout}
            details={details}
            addDetail={addDetail}
            deleteDetail={deleteDetail}
          />
        </div>
      </div>
    </>
  );
};

export default StoreApi;
