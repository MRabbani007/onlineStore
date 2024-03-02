import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { GlobalContext } from "./GlobalState";
import { productReducer } from "./ProductReducer";
import { PRODUCT } from "../data/actions";

const ProductContext = createContext({});

// Template for creating new product
const initialState = {
  id: crypto.randomUUID(),
  name: "new product",
  category: "category",
  department: "",
  rating: {
    stars: 4.5,
    count: 10,
  },
  reviews: 0,
  priceCents: 0,
  salePrice: 0,
  priceList: [],
  supplier: "supplier",
  brand: "",
  properties: ["Size", "Style", "Model", "Color"],
  values: [["Size"], ["Style"], ["Model"], ["Color"]],
  imagesBasedOn: "",
  images: [[""]],
  imagesNames: [],
  imagesURL: "",
  about: ["About this product"],
  details: [],
  itemWeight: { unit: "kg", weight: 0 },
  purchased: 0,
  refURL: "",
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // get edit product from global provider
  const {
    loadingEditProduct,
    editProduct,
    handleProductUpdate,
    handleProductCreate,
    handleProductRemove,
  } = useContext(GlobalContext);

  // display images (left block)
  const [productImages, setProductImages] = useState(["", "", ""]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!loadingEditProduct) {
      console.log(editProduct);
      dispatch({ type: PRODUCT.LOAD_PRODUCT, payload: editProduct });
      loadProductProperties();
      setProductImages(editProduct.images[0]);
      setMainImage(editProduct.images[0][0]);
    }
  }, [loadingEditProduct, editProduct]);

  // Load Product properties & values
  const loadProductProperties = () => {
    if (!!editProduct) {
      if (!editProduct?.imagesBasedOn) {
        dispatch({ type: PRODUCT.IMAGE_REFERENCE, payload: "" });
      }
      if (!editProduct?.imagesNames) {
        // || editProduct.imagesNames.length !== editProduct?.images?.length
        let temp = Array(editProduct.images.length).fill("");
        dispatch({ type: PRODUCT.IMAGES_NAMES_SET, payload: temp });
      }
      if (!editProduct?.images) {
        dispatch({ type: PRODUCT.IMAGES_SET });
      }
    }
  };

  const handleDisplayImage = (index) => {
    setProductImages(state?.images[index]);
    setMainImage(state?.images[index][0]);
  };

  // set main image on thumb hover
  const handleMainImage = (index) => {
    setMainImage(productImages[index]);
  };

  // Load Product from local storage
  const loadProduct = () => {
    let temp = localStorage.getItem("product");
    if (temp) {
      dispatch({
        type: PRODUCT.LOAD_PRODUCT,
        payload: JSON.parse(temp),
      });
    }
  };

  // Save Product to local storage
  const saveProduct = () => {
    localStorage.setItem("product", JSON.stringify(state));
    alert("Product Saved to localstorage");
  };

  // Create new product in DB
  const handleCreateProduct = () => {
    handleProductCreate(state);
  };

  // Update product in DB
  const handeApplyEdit = async () => {
    handleProductUpdate(state);
  };

  return (
    <ProductContext.Provider
      value={{
        product: state,
        dispatch,

        productImages,
        handleDisplayImage,
        mainImage,
        handleMainImage,

        handleCreateProduct,
        handeApplyEdit,
        loadProduct,
        saveProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
