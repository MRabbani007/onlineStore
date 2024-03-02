import { useContext, useDebugValue } from "react";
import { GlobalContext } from "../context/GlobalState";

const useGlobal = () => {
  // const { product } = useContext(ProductContext);
  // useDebugValue(product, (product) => (product?.name ? "Loaded" : "Null"));
  return useContext(GlobalContext);
};

export default useGlobal;
