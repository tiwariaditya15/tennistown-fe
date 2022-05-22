import { Routes, Route } from "react-router-dom";
import { Cart } from "../../pages/Cart";
import { WishLists } from "../../pages/WishLists";
import { Products } from "../../pages/Products";
import { Login } from "../../pages/Login";
import { Signup } from "../../pages/Signup";
import { Home } from "../../pages/Home";
import { Accounts } from "../../pages/Accounts";
import PrivateRoutes from "./PrivateRoutes";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <PrivateRoutes path="cart" element={<Cart />} />
      <PrivateRoutes path="wishlists" element={<WishLists />} />
      <PrivateRoutes path="accounts" element={<Accounts />} />
    </Routes>
  );
}
