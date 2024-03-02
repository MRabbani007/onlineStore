import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { genPrice } from "../../data/productFunctions";

const ProdSubHeader = () => {
  const { product } = useContext(GlobalContext);

  const [{ priceWhole, priceFraction }, setPrice] = useState({
    priceWhole: 0,
    priceFraction: 0,
  });

  useEffect(() => {
    setPrice(genPrice(product?.priceCents));
  }, [product?.priceCents]);

  return (
    <div>
      <div className="">
        <span className="text-2xl">{"$" + priceWhole}</span>
        <span className="align-super">{priceFraction}</span>
      </div>
      <div>Ships to Kazakhstan</div>
    </div>
  );
};

export default ProdSubHeader;
