import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useInteractions } from "./context/InteractionProvider";
import { Navbar } from "./components/Navbar/";
import { Cart } from "./components/Cart/";
import { WishLists } from "./components/WishLists/";
import { Products } from "./components/Products/";
import { Login } from "./components/Login/";
import { Sidebar } from "./components/Sidebar";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home/";
import { Accounts } from "./components/Accounts/";
import { IDLE } from "./constants/interactions";
import { Snackbar } from "./components/Atoms/Snackbar";
import PrivateRoutes from "./components/PrivateRoutes";
import "./index.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useInteractions();
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
      {status !== IDLE && <Snackbar status={status} />}
    </div>
  );
}
