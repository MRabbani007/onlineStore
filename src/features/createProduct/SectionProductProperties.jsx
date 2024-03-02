import { useState } from "react";
import CardAddProperty from "./CardAddProperty";
import CardProperty from "./CardProperty";
import useProduct from "../../hooks/useProduct";
import { FaMinus, FaPlus } from "react-icons/fa";

const SectionProductProperties = () => {
  const { product } = useProduct();

  // Control view of section
  const [view, setView] = useState(true);

  return (
    <div>
      {/* Header */}
      <h2 className="bg-slate-200 p-2 flex justify-start items-center">
        {view ? (
          <FaMinus className="inline mx-2" onClick={() => setView(!view)} />
        ) : (
          <FaPlus className="inline mx-2" onClick={() => setView(!view)} />
        )}
        Properties
      </h2>
      {view && (
        <div>
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
      )}
    </div>
  );
};

export default SectionProductProperties;
