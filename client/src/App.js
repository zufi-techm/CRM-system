import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import CustomerProfile from "./pages/CustomerProfile";
const App = () => {
  return (
    <section className="blue min-h-screen  blue">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
        </Routes>
      </Router>
    </section>
  );
};

export default App;
