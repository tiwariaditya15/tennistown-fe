import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import WishLists from "./components/WishLists/WishLists";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Signup from "./components/Signup/Signup";
import { products } from "./Data/Products";
import "./index.css";
export default function App({}) {
  const [isOpen, setIsOpen] = useState(false);

  console.log({ products, isOpen });
  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlists" element={<WishLists />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
