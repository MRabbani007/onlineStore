import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const ProdProperties = ({ addproperty, isSelected }) => {
  const { product } = useContext(GlobalContext);

  const [temp, setTemp] = useState(false);

  return (
    <div>
      {Array.isArray(product?.properties) &&
        product?.properties.map((property, index) => {
          return (
            <div key={index}>
              <h3 className="text-slate-950 text-xl font-semibold my-2 ml-2">
                {property}
              </h3>
              {Array.isArray(product?.values) &&
                product.values[index].map((value, idx) => {
                  if (isSelected(property, value)) {
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
                        onClick={() => {
                          addproperty(property, value);
                          setTemp(!temp);
                        }}
                      >
                        {value}
                      </div>
                    );
                  }
                })}
            </div>
          );
        })}
    </div>
  );
};

export default ProdProperties;
