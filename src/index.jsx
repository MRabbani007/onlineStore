import React from "react";
import ReactDOM from "react-dom/client";
// Import Router
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Imported Styles
import "./styles/index.css";
// Imported Components
import Store from "./views/Store";
import Cart from "./views/Cart";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import HomePage from "./views/HomePage";
import OrdersPage from "./views/OrdersPage";
import SettingsPage from "./views/SettingsPage";
import ProductPage from "./views/ProductPage";
import CreateProductPage from "./views/CreateProductPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/onlineStore/" element={<HomePage />}></Route>
        <Route path="/onlineStore/store" element={<Store />}></Route>
        <Route path="/onlineStore/product" element={<ProductPage />}></Route>
        <Route path="/onlineStore/cart" element={<Cart />}></Route>
        <Route path="/onlineStore/orders" element={<OrdersPage />}></Route>
        <Route path="/onlineStore/signin" element={<Signin />}></Route>
        <Route path="/onlineStore/signup" element={<Signup />}></Route>
        <Route
          path="/onlineStore/storeapi"
          element={<CreateProductPage />}
        ></Route>
        <Route path="/onlineStore/settings" element={<SettingsPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
