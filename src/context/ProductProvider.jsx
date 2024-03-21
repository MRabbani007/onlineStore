import { createContext, useEffect, useReducer, useState } from "react";
import { productReducer } from "./ProductReducer";
import { ACTIONS, PRODUCT, SERVER } from "../data/actions";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";

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

  const { auth } = useAuth();

  const navigate = useNavigate();

  // Create Product Page
  const [loading, setLoading] = useState(true);
  const [toggleProduct, setToggleProduct] = useState(false);

  // Update product in DB
  const handleProductUpdate = async () => {
    let response = await axiosPrivate.post(SERVER.PRODUCTS_UPDATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_UPDATE,
        payload: { userName: auth?.user, product: state },
      },
    });
    if (response?.data) {
      alert("Product Saved");
      setToggleProduct(!toggleProduct);
      // navigate("store");
    }
  };

  // Create new product in DB
  const handleProductCreate = async () => {
    console.log(state);
    let response = await axiosPrivate.post(SERVER.PRODUCTS_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_CREATE,
        payload: { userName: auth?.user, product: state },
      },
    });
    if (response?.data) {
      alert("Product Created");
      setToggleProduct(!toggleProduct);
    }
  };

  // Delete Product from DB
  const handleProductRemove = async (productID) => {
    let response = await axiosPrivate.post(SERVER.PRODUCTS_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_CREATE,
        payload: { userName: auth?.user, productID },
      },
    });
    if (response?.data?.status === "success") {
      dispatch({ type: PRODUCT.LOAD_PRODUCT, payload: initialState });
    }
  };

  const handleOpenEditProduct = async (productID) => {
    handleProductGet(productID);
    navigate("/createProduct", { state: { productID } });
  };

  const handleProductGet = async (productID) => {
    try {
      setLoading(true);
      let response = await axiosPrivate.post(SERVER.PRODUCTS_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.PRODUCTS_GET,
          payload: { userName: auth?.user, productID },
        },
      });
      if (response?.data) {
        dispatch({ type: PRODUCT.LOAD_PRODUCT, payload: response.data });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // display images (left block)
  const [productImages, setProductImages] = useState(["", "", ""]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!loading) {
      loadProductProperties();
      setProductImages(state.images[0]);
      setMainImage(state.images[0][0]);
    }
  }, [loading]);

  // Load Product properties & values
  const loadProductProperties = () => {
    if (!loading && !!state) {
      if (!state?.imagesBasedOn) {
        dispatch({ type: PRODUCT.IMAGE_REFERENCE, payload: "" });
      }
      if (!state?.imagesNames) {
        let temp = Array(state.images.length).fill("");
        dispatch({ type: PRODUCT.IMAGES_NAMES_SET, payload: temp });
      }
      if (!state?.images) {
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
      setToggleProduct(!toggleProduct);
    }
  };

  // Save Product to local storage
  const saveProduct = () => {
    localStorage.setItem("product", JSON.stringify(state));
    alert("Product Saved to localstorage");
  };

  const clearProduct = () => {
    dispatch({ type: PRODUCT.LOAD_PRODUCT, payload: initialState });
    setToggleProduct(!toggleProduct);
  };

  return (
    <ProductContext.Provider
      value={{
        product: state,
        loading: loading,
        toggleProduct,
        dispatch,

        productImages,
        handleDisplayImage,
        mainImage,
        handleMainImage,

        handleOpenEditProduct,
        handleProductCreate,
        handleProductUpdate,
        handleProductRemove,
        loadProduct,
        saveProduct,
        clearProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
