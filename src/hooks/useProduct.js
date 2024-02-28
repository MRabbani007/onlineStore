import { useContext, useDebugValue } from "react";
import ProductContext from "../context/ProductProvider";

const useProduct = () => {
  const { product } = useContext(ProductContext);
  useDebugValue(product, (product) => (product?.name ? "Loaded" : "Null"));
  return useContext(ProductContext);
};

export default useProduct;
