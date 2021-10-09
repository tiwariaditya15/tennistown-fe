import { Routes, Route } from "react-router-dom";
import { Cart } from "../Cart";
import { WishLists } from "../WishLists/";
import { Products } from "../Products/";
import { Login } from "../Login/";
import { Signup } from "../Signup";
import { Home } from "../Home/";
import { Accounts } from "../Accounts/";
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
