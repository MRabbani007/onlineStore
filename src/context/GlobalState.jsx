import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// Imported Data
import { appReducer } from "./AppReducer";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTIONS, SERVER } from "../data/actions";
import { ITEMS_PER_PAGE } from "../data/utils";
import { useNavigate } from "react-router-dom";

// Initial state
// App will display only 1 list with its tasks
const initialState = {};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Navbar Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("");
  // temp bool to toggle search
  const [temp, setTemp] = useState(false);
  // Pagination
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // Product Page
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Product Page
  const [editProduct, setEditProduct] = useState({});
  const [loadingEditProduct, setLoadingEditProduct] = useState(true);

  // Store Page Products
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loadingStore, setLoadingStore] = useState(true);
  // Total Count of Products
  const [productCount, setProductCount] = useState(0);

  const handleSearchSubmit = (searchQuery = "", searchCat = "") => {
    if (searchQuery !== undefined) {
      setSearchQuery(searchQuery);
    }
    if (searchCat !== undefined) {
      setSearchCat(searchCat);
    }
    setActivePage(1);
    setTemp(!temp);
  };

  const handleSearch = async () => {
    try {
      setLoadingStore(true);
      navigate("store");
      let response = await axiosPrivate.post(SERVER.PRODUCTS_SEARCH, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.PRODUCTS_SEARCH,
          payload: { userName: auth?.user, searchCat, searchQuery, activePage },
        },
      });
      if (response?.data) {
        const { products, count } = response?.data;
        setDisplayProducts(products);
        setProductCount(count);
        setPages(Math.ceil(count / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.log("Search Error");
    } finally {
      setLoadingStore(false);
    }
  };

  const handleCartGet = async () => {
    try {
      let response = await axiosPrivate.post(SERVER.CART_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.CART_GET,
          payload: { userName: auth?.user },
        },
      });
      if (response?.data && Array.isArray(response.data)) {
        setCart(response.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const handleCartAdd = async (selectedProduct) => {
    let response = await axiosPrivate.post(SERVER.CART_ADD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CART_ADD,
        payload: { userName: auth?.user, newCartItem: selectedProduct },
      },
    });
    setCart((prev) => {
      let newCart = prev.filter((item) => item.id !== selectedProduct.id);
      newCart.push(selectedProduct);
      return newCart;
    });
    alert("added " + selectedProduct.name);
  };

  const handleCartRemove = async (id) => {
    let response = await axiosPrivate.post(SERVER.CART_REMOVE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CART_REMOVE,
        payload: { userName: auth?.user, id },
      },
    });
    setCart((prev) => {
      let newCart = prev.filter((item) => item.id !== id);
      return newCart;
    });
  };

  const handleCartUpdateQuantity = async (id, quantity) => {
    setCart((prev) => {
      let itemIndex = prev.findIndex((item) => item.id === id);
      prev[itemIndex].quantity = quantity;
      return [...prev];
    });
    let response = await axiosPrivate.post(SERVER.CART_UPDATE_QUANTITY, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CART_UPDATE_QUANTITY,
        payload: { userName: auth?.user, id, quantity },
      },
    });
  };

  const handleCartUpdateItem = async () => {
    // TODO: implement
  };

  const handleOrderGet = async () => {
    try {
      let response = await axiosPrivate.post(SERVER.ORDER_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.ORDER_GET,
          payload: { userName: auth?.user },
        },
      });
      if (response?.data && Array.isArray(response.data)) {
        setOrders(response.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const handlePage = (page) => {
    setActivePage(page);
  };

  const handleOpenProduct = async (productID) => {
    try {
      setLoading(true);
      navigate("/product");
      let response = await axiosPrivate.post(SERVER.PRODUCTS_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.PRODUCTS_GET,
          payload: { userName: auth?.user, productID },
        },
      });
      if (response?.data) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditProduct = async (productID) => {
    handleProductEditGet(productID);
    navigate("/createProduct", { state: { productID: product.id } });
  };

  const handleProductEditGet = async (productID) => {
    try {
      setLoadingEditProduct(true);
      let response = await axiosPrivate.post(SERVER.PRODUCTS_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.PRODUCTS_GET,
          payload: { userName: auth?.user, productID },
        },
      });
      if (response?.data) {
        setEditProduct(response.data);
      }
    } catch (error) {
    } finally {
      setLoadingEditProduct(false);
    }
  };

  const handleProductUpdate = async (product) => {
    let response = await axiosPrivate.post(SERVER.PRODUCTS_UPDATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_UPDATE,
        payload: { userName: auth?.user, product },
      },
    });
    if (response?.data) {
      alert("Product Saved");
      navigate("store");
    }
  };

  const handleProductCreate = async (product) => {
    let response = await axiosPrivate.post(SERVER.PRODUCTS_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_CREATE,
        payload: { userName: auth?.user, product },
      },
    });
    if (response?.data) {
      setEditProduct(response.data);
      alert("Product Created");
    }
  };

  const handleProductRemove = async (productID) => {
    let response = await axiosPrivate.post(SERVER.PRODUCTS_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_CREATE,
        payload: { userName: auth?.user, productID },
      },
    });
    if (response?.data?.status === "success") {
      setEditProduct({});
    }
  };

  const handlePlaceOrder = async () => {
    if (auth?.user === "") {
      alert("Signin to place order");
    } else if (cart.length === 0) {
      alert("Add items to cart");
    } else {
      let response = await axiosPrivate.post(SERVER.ORDER_CREATE, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.ORDER_CREATE,
          payload: { userName: auth?.user },
        },
      });
      if (response?.data?.status === "success") {
        alert("Order Placed");
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [activePage, searchCat, searchQuery, temp]);

  useEffect(() => {
    handleCartGet();
    handleOrderGet();
    if (auth?.user) {
    }
  }, [auth?.user]);

  return (
    <GlobalContext.Provider
      value={{
        displayProducts,
        loadingStore,
        cart,
        orders,
        handleSearchSubmit,
        pages,
        activePage,
        handlePage,
        loading,
        product,
        editProduct,
        loadingEditProduct,
        handleOpenProduct,
        handleCartAdd,
        handleCartRemove,
        handleCartUpdateQuantity,
        handlePlaceOrder,
        handleOpenEditProduct,
        handleProductEditGet,
        handleProductUpdate,
        handleProductCreate,
        handleProductRemove,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
