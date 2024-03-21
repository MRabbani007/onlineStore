import React from "react";
import CardAddProperty from "../createProduct/CardAddProperty";
import CardProperty from "../createProduct/CardProperty";
import useProduct from "../../hooks/useProduct";

const ProductProperties = () => {
  const { product } = useProduct();

  return (
    <div className="form__product">
      <h2 className="bg-slate-200 rounded-lg shadow-md shadow-slate-300 py-2 px-4 flex justify-start items-center">
        Properties
      </h2>
      <div className="flex flex-col gap-3 p-4">
        <CardAddProperty />
        {Array.isArray(product?.properties) &&
          product?.properties.map((property, index) => {
            return (
              <CardProperty
                property={property}
                values={product?.values[index]}
                key={index}
                propIndex={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductProperties;
