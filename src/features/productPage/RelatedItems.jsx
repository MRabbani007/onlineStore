import { useContext } from "react";
import MyCarousel from "../../components/MyCarousel";
import { GlobalContext } from "../../context/GlobalState";
import Card from "../../components/Card";

const RelatedItems = () => {
  const { displayProducts } = useContext(GlobalContext);
  return (
    <div>
      <h2>Similar Items</h2>
      <MyCarousel>
        {Array.isArray(displayProducts) &&
          displayProducts.map((product, index) => {
            return <Card product={product} key={crypto.randomUUID()} />;
          })}
      </MyCarousel>
    </div>
  );
};

export default RelatedItems;
