import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import WishLists from "./components/WishLists/WishLists";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Accounts from "./components/Accounts/Accounts";
import PrivateRoutes from "./components/PrivateRoutes";
import "./index.css";

export default function App({}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <PrivateRoutes path="cart" element={<Cart />} />
        <PrivateRoutes path="wishlists" element={<WishLists />} />
        <PrivateRoutes path="accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}
