import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Hooks
import useGlobal from "../hooks/useGlobal";
// Imported Components
import ProdHeader from "../features/productPage/ProdHeader";
import ProdImages from "../features/productPage/ProdImages";
import ProdSubHeader from "../features/productPage/ProdSubHeader";
import Checkout from "../features/productPage/Checkout";
import ProdProperties from "../features/productPage/ProdProperties";
import ProdPropertiesImage from "../features/productPage/ProdPropertiesImage";
import ProdDetails from "../features/productPage/ProdDetails";
// Imported Data

const ProductPage = () => {
  const { loading, product, handleCartAdd } = useGlobal();

  // Store Selected Product
  const [selectedProduct, setSelectedProduct] = useState([]);

  // Page Navigation
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectProperties = () => {
    return [...product?.properties, "image"];
  };

  // add property to selected product
  const addproperty = (property, value) => {
    setSelectedProduct((current) => {
      // push property to selected product
      let propIndex = current.property.findIndex((prop) => prop === property);
      if (propIndex >= 0) {
        current.value[propIndex] = value;
      } else {
        current.property.push(property);
        current.value.push(value);
      }
      return { ...current };
    });
  };

  // check if property value is selected
  const isSelected = (property, value) => {
    let propIndex = selectedProduct?.property?.findIndex(
      (prop) => prop === property
    );
    if (propIndex >= 0) {
      if (property === "image") {
        console.log(selectedProduct.value[propIndex]);
        if (selectedProduct.value[propIndex].split(" ")[1] === value) {
          return true;
        } else {
          return false;
        }
      } else {
        if (selectedProduct.value[propIndex] === value) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  // add selected product to cart
  const handleSubmit = () => {
    let propertiesSelected = true;
    let required = "";
    selectedProduct.value.map((val, index) => {
      if (val === "") {
        propertiesSelected = false;
        required = required + selectedProduct.property[index] + " ";
      } else {
      }
    });
    if (propertiesSelected) {
      handleCartAdd(selectedProduct);
    } else {
      alert("Select " + required);
    }
  };

  // Load Product properties & values
  useEffect(() => {
    if (product && typeof product !== "undefined" && product.length !== 0) {
      // initiate selected product to be added to cart
      let requiredProps = getSelectProperties(product);
      setSelectedProduct({
        id: crypto.randomUUID(),
        prodID: product?.id,
        name: product?.name,
        supplier: product?.supplier,
        priceCents: product?.priceCents,
        property: [...requiredProps],
        value: Array(requiredProps.length).fill(""),
        quantity: 1,
      });
    }
  }, [loading, product]);

  return (
    <div className="text-slate-950 flex md:flex-nowrap flex-wrap px-5 gap-5">
      {loading ? null : (
        <>
          {/* Left Column: images */}
          <ProdImages />
          {/* Middle Column: Product info */}
          <div className="md:flex-1 w-full border-[1px]">
            <ProdHeader />
            <div className="p-3">
              <ProdSubHeader />
              <h2 className="text-2xl font-semibold">Product Details</h2>
              <ProdProperties
                addproperty={addproperty}
                isSelected={isSelected}
              />
              <ProdPropertiesImage
                addproperty={addproperty}
                isSelected={isSelected}
              />
              <ProdDetails />
            </div>
          </div>
          {/* Right Column: Checkout */}
          <Checkout handleSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
