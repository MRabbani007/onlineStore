import CardSupplier from "./CardSupplier";
import CardRatingStars from "./CardRatingStars";
import CardRatingsReviews from "./CardRatingsReviews";
import { PRODUCT } from "../../data/actions";
import CardEditItem from "./CardEditItem";
import useProduct from "../../hooks/useProduct";

const SectionHeader = () => {
  const { product } = useProduct();

  return (
    <header className="w-full bg-slate-200 p-3">
      {/* Product Header */}
      <CardEditItem
        initialValue={product?.name}
        type={PRODUCT.NAME}
        title="Product Name"
        showFormLabel={false}
      />
      <CardEditItem
        initialValue={product?.supplier}
        type={PRODUCT.SUPPLIER}
        title="Supplier"
        showFormLabel={false}
      />
      <div className="flex justify-between items-center">
        <CardRatingStars />
        <CardRatingsReviews />
      </div>
    </header>
  );
};

export default SectionHeader;
