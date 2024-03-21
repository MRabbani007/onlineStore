import { useState } from "react";
import CardGetProduct from "./CardGetProduct";
import useProduct from "../../hooks/useProduct";
import { Link } from "react-router-dom";

const SectionEditPageHeader = () => {
  const {
    loadProduct,
    saveProduct,
    clearProduct,
    handleProductCreate,
    handleProductUpdate,
    handleProductRemove,
  } = useProduct();

  const [expand, setExpand] = useState(true);

  return (
    <section className="flex flex-col items-center">
      <h1
        onClick={() => setExpand(!expand)}
        className="text-center cursor-pointer"
      >
        Create New Product
      </h1>
      {/* Load Product from DB */}
      <div className={expand ? "flex gap-2 items-center" : "hidden"}>
        <CardGetProduct />
        <button className="btn btn-blue" onClick={() => handleProductUpdate()}>
          Apply Edit
        </button>
      </div>
      {/* Save to local Storage */}
      <div className={expand ? "flex gap-2 items-center" : "hidden"}>
        <button onClick={() => clearProduct()} className="btn btn-red">
          Clear Product
        </button>
        <button onClick={() => loadProduct()} className="btn btn-slate">
          Load Product
        </button>
        <button onClick={() => saveProduct()} className="btn btn-slate">
          Save Product
        </button>
        <button
          className="btn btn-yellow"
          onClick={() => handleProductCreate()}
        >
          Create New Product
        </button>
      </div>
    </section>
  );
};

export default SectionEditPageHeader;
