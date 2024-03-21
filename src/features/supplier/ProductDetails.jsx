import SectionAbout from "../createProduct/SectionAbout";
import SectionDetails from "../createProduct/SectionDetails";

const ProductDetails = () => {
  return (
    <div className="form__product">
      <h2 className="bg-slate-200 rounded-lg shadow-md shadow-slate-300 py-2 px-4 flex justify-start items-center">
        Details
      </h2>
      <div className="flex flex-col gap-2 p-2">
        <SectionAbout />
        <SectionDetails />
      </div>
    </div>
  );
};

export default ProductDetails;
