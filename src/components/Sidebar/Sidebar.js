import {
  MdiClose,
  MdiHome,
  MdiCart,
  MdiCardsHeart,
  MdiAccount,
} from "../icones/index";
import { NavLink } from "react-router-dom";
import "./style.css";
export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <section
      className={isOpen ? "sidebar active" : "sidebar"}
      onClick={() => setIsOpen(false)}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <span onClick={() => setIsOpen(false)}>
          <MdiClose />
        </span>
      </section>
      <section className="menu-side">
        <NavLink to="/">
          <section className="routes">
            <span>
              <MdiHome />
            </span>
            <span>Home</span>
          </section>
        </NavLink>
        <NavLink to="cart">
          <section className="routes">
            <span>
              <MdiCart width="1rem" height="1rem" />
            </span>
            <span>My Cart</span>
          </section>
        </NavLink>
        <NavLink to="wishlists">
          <section className="routes">
            <span>
              <MdiCardsHeart width="1rem" height="1rem" />
            </span>
            <span>My Wishlists</span>
          </section>
        </NavLink>
        <NavLink to="accounts">
          <section className="routes">
            <span>
              <MdiAccount />
            </span>
            <span>My Account</span>
          </section>
        </NavLink>
      </section>
    </section>
  );
}
