import DropDownOptions from "../../components/DropDownOptions";
import useProduct from "../../hooks/useProduct";
import { PRODUCT } from "../../data/actions";
import { categoryOptions } from "../../data/departments";

const CardCategory = () => {
  const { product, dispatch } = useProduct();

  const handleCategoryChange = (value) => {
    dispatch({ type: PRODUCT.CATEGORY, payload: value });
  };

  return (
    <div>
      {product?.category}
      <DropDownOptions
        title={"category"}
        options={categoryOptions}
        selectedValue={product?.category}
        handleSelected={handleCategoryChange}
      />
    </div>
  );
};

export default CardCategory;
