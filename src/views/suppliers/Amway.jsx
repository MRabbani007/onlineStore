import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AmwayHeader from "../../features/suppliers/amway/AmwayHeader";
import Products from "../../features/suppliers/amway/Products";
import AmwayAbout from "../../features/suppliers/amway/AmwayAbout";

const Amway = () => {
  const location = useLocation();
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    if (location.state) {
      setSupplier(location.state.supplier);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {supplier.toLowerCase().includes("amway") && <AmwayHeader />}
      <h1>{supplier}</h1>
      <Products supplier={supplier} />
      {supplier.toLowerCase().includes("amway") && <AmwayAbout />}
    </div>
  );
};

export default Amway;
