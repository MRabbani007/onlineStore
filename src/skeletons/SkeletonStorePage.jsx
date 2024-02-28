import Skeleton from "./Skeleton";

const SkeletonContentPage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
      <Skeleton classes="product-card" />
    </div>
  );
};

export default SkeletonContentPage;
