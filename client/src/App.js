import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/users/Home";
import ProtectedPage from "./components/ProtectedPage";
import Product from "./pages/users/Product";
import Cart from "./pages/users/Cart";
import CreateNewProduct from "./pages/admin/CreateNewProduct";
import Profile from "./pages/Profile";
import WishList from "./pages/users/WishList";
import AdminProtect from "./components/AdminProtect";
import UserProtect from "./components/UserProtect";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllUsers from "./pages/admin/AllUsers";
import AllProducts from "./pages/admin/AllProducts";
import AllOrders from "./pages/admin/AllOrders";
import Payments from "./pages/users/Payments";
import Success from "./pages/users/Success";
import Cancel from "./pages/users/Cancel";

const App = () => {
  return (
    <section>
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedPage></ProtectedPage>} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <UserProtect>
                <Cart />
              </UserProtect>
            }
          />
          <Route
            path="/profile"
            element={
              <UserProtect>
                <Profile />
              </UserProtect>
            }
          />
          <Route
            path="/wishlist"
            element={
              <UserProtect>
                <WishList />
              </UserProtect>
            }
          />
          <Route path="/pay" element={<Payments />} />
          <Route path="/pay-success" element={<Success />} />
          <Route path="/pay-cancel" element={<Cancel />} />
          <Route
            path="*"
            element={
              <div className="h-screen animate-pulse text-xl bg-blue-100 flex items-center justify-center">
                Page not found
              </div>
            }
          />
          //admin
          <Route
            path="/create-new-product"
            element={
              <AdminProtect>
                <CreateNewProduct />
              </AdminProtect>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminProtect>
                <AdminDashboard />
              </AdminProtect>
            }
          />
          <Route
            path="/all-users"
            element={
              <AdminProtect>
                <AllUsers />
              </AdminProtect>
            }
          />
          <Route
            path="/all-products"
            element={
              <AdminProtect>
                <AllProducts />
              </AdminProtect>
            }
          />
          <Route
            path="/all-orders"
            element={
              <AdminProtect>
                <AllOrders />
              </AdminProtect>
            }
          />
        </Routes>
      </Router>
    </section>
  );
};

export default App;
