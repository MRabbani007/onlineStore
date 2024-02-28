import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const CardGetProduct = () => {
  const { handleOpenEditProduct } = useContext(GlobalContext);
  const [productID, setProductID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpenEditProduct(productID);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mx-3">
      <label htmlFor="productid" className="text-nowrap">
        Product ID:
      </label>
      <input
        name="productid"
        type="text"
        value={productID}
        onChange={(e) => setProductID(e.target.value)}
        className="border-blue mx-2"
      />
      <button className="btn btn-blue" onClick={() => null}>
        Fetch Product
      </button>
    </form>
  );
};

export default CardGetProduct;
