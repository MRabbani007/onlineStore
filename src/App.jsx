import React from "react";
// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./views/Store";
import ProductView from "./views/ProductView";
import Cart from "./views/Cart";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import HomePage from "./views/HomePage";
import OrdersPage from "./views/OrdersPage";
import StoreApi from "./views/StoreApi";
import SettingsPage from "./views/SettingsPage";
import ProductPage from "./views/ProductPage";
import CreateProductPage from "./views/CreateProductPage";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
