import CardName from "./CardName";
import CardSupplier from "./CardSupplier";
import CardRatingStars from "./CardRatingStars";
import CardRatingsReviews from "./CardRatingsReviews";

const SectionHeader = () => {
  return (
    <header className="w-full bg-slate-200 p-3">
      {/* Product Header */}
      <CardName />
      <CardSupplier />

      <div className="flex justify-between items-center">
        <CardRatingStars />
        <CardRatingsReviews />
      </div>
    </header>
  );
};

export default SectionHeader;
