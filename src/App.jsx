import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/appStyles.css";
import "./styles/index.css";
// Imported Context
import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/GlobalState";
import { UserProvider } from "./context/UserState";
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
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import OrdersPage from "./views/OrdersPage";
import ProductPage from "./views/ProductPage";
import CreateProductPage from "./views/CreateProductPage";
import { ProductProvider } from "./context/ProductProvider";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
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

                {/* Pages available to users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                  }
                >
                  <Route path="cart" element={<Cart />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="changePWD" element={<ChangePassword />} />
                </Route>

                {/* Admin page available to admin */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="createProduct" element={<CreateProductPage />} />
                  <Route path="admin" element={<AdminPage />} />
                </Route>
              </Route>

              {/* catch all */}
              <Route path="*" element={<MissingPage />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
