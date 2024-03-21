import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/stylesForms.css";
import "./styles/index.css";
import "./styles/main.css";
// Imported Context
import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/GlobalState";
import { UserProvider } from "./context/UserState";
import { ProductProvider } from "./context/ProductProvider";
// Authorization & Nav
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./features/layout/Layout";
// Imported Components
import HomePage from "./views/HomePage";
import SigninPage from "./views/SigninPage";
import SignupPage from "./views/SignupPage";
import SettingsPage from "./views/SettingsPage";
import ChangePassword from "./views/ChangePassword";
import AdminPage from "./views/AdminPage";
import MissingPage from "./views/MissingPage";
import Unauthorized from "./views/Unauthorized";

import Store from "./views/Store";
import Cart from "./views/Cart";
import OrdersPage from "./views/OrdersPage";
import ProductPage from "./views/ProductPage";
import CreateProductPage from "./views/CreateProductPage";
import SupplierPage from "./views/SupplierPage";
import AdminProducts from "./views/admin/AdminProducts";
import AdminOrders from "./views/admin/AdminOrders";
import AdminCarts from "./views/admin/AdminCarts";
import AdminUsers from "./views/admin/AdminUsers";
import TrackOrder from "./views/TrackOrder";
import ReviewProduct from "./views/ReviewProduct";
import ShippingAddress from "./views/settings/ShippingAddress";
import UserAccount from "./views/settings/UserAccount";
import CreateProductBulk from "./features/supplier/CreateProductBulk";

const ROLES = {
  User: 2001,
  Supplier: 3010,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
          <ProductProvider>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path="/" element={<Layout />}>
                  {/* Pages visible to all */}
                  <Route index element={<HomePage />} />
                  <Route path="login" element={<SigninPage />} />
                  <Route path="register" element={<SignupPage />} />
                  <Route path="unauthorized" element={<Unauthorized />} />
                  <Route path="store" element={<Store />} />
                  <Route path="product" element={<ProductPage />} />
                  <Route path="supplier" element={<SupplierPage />} />

                  {/* Pages available to users */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                    }
                  >
                    <Route path="cart" element={<Cart />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="trackOrder" element={<TrackOrder />} />
                    <Route path="reviewProduct" element={<ReviewProduct />} />

                    {/* TODO: change route to /settings/... */}
                    <Route path="settings" element={<SettingsPage />} />
                    <Route
                      path="shippingAddress"
                      element={<ShippingAddress />}
                    />
                    <Route path="userAccount" element={<UserAccount />} />
                    <Route path="changePWD" element={<ChangePassword />} />
                  </Route>

                  {/* Create Product page available to admin & suppliers */}
                  <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route
                      path="createProduct"
                      element={<CreateProductPage />}
                    />
                    <Route path="createBulk" element={<CreateProductBulk />} />
                  </Route>

                  {/* Admin page available to admin */}
                  <Route
                    path="admin"
                    element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                  >
                    <Route path="main" element={<AdminPage />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="carts" element={<AdminCarts />} />
                  </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<MissingPage />} />
              </Route>
            </Routes>
          </ProductProvider>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
