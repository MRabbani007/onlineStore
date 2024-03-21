import { useState } from "react";
import ProductHeader from "./ProductHeader";
import ProductProperties from "./ProductProperties";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import useProduct from "../../hooks/useProduct";
import SectionEditPageHeader from "../createProduct/SectionEditPageHeader";

const CreateProductBulk = () => {
  const {
    loading,
    loadProduct,
    saveProduct,
    handleProductCreate,
    handleProductUpdate,
    handleProductRemove,
  } = useProduct();

  const [formIndex, setFormIndex] = useState(0);

  const handleFormIndex = (index) => {
    if (index !== undefined) {
      setFormIndex(index);
    }
  };

  return (
    <div className="form__product">
      <SectionEditPageHeader />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className={(formIndex === 0 ? "btn-yellow " : " btn-slate ") + " btn"}
          onClick={(e) => handleFormIndex(0)}
        >
          Header
        </button>
        <button
          type="button"
          className={(formIndex === 1 ? "btn-yellow " : " btn-slate ") + " btn"}
          onClick={(e) => handleFormIndex(1)}
        >
          Properties
        </button>
        <button
          type="button"
          className={(formIndex === 2 ? "btn-yellow " : " btn-slate ") + " btn"}
          onClick={(e) => handleFormIndex(2)}
        >
          Images
        </button>
        <button
          type="button"
          className={(formIndex === 3 ? "btn-yellow " : " btn-slate ") + " btn"}
          onClick={(e) => handleFormIndex(3)}
        >
          Details
        </button>
        {/* <button
          type="button"
          className="btn btn-blue"
          onClick={handleProductCreate}
        >
          Add Product
        </button> */}
      </div>
      {true && (
        <>
          {formIndex === 0 && <ProductHeader />}
          {formIndex === 1 && <ProductProperties />}
          {formIndex === 2 && <ProductImages />}
          {formIndex === 3 && <ProductDetails />}
        </>
      )}
    </div>
  );
};

export default CreateProductBulk;
