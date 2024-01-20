import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
import "./src/styles/index.css";
// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/storeapi" element={<CreateProductPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
