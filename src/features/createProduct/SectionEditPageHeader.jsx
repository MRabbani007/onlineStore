import { useState } from "react";
import CardGetProduct from "./CardGetProduct";
import useProduct from "../../hooks/useProduct";

const SectionEditPageHeader = () => {
  const { handeApplyEdit, loadProduct, saveProduct, handleCreateProduct } =
    useProduct();

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
        <button className="btn btn-blue" onClick={() => handeApplyEdit()}>
          Apply Edit
        </button>
      </div>
      {/* Save to local Storage */}
      <div className={expand ? "flex gap-2 items-center" : "hidden"}>
        <button onClick={() => loadProduct()} className="btn btn-slate">
          Load Product
        </button>
        <button onClick={() => saveProduct()} className="btn btn-slate">
          Save Product
        </button>
        <button
          className="btn btn-yellow"
          onClick={() => handleCreateProduct()}
        >
          Create New Product
        </button>
      </div>
    </section>
  );
};

export default SectionEditPageHeader;
