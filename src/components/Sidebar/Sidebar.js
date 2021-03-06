import {
  MdiClose,
  MdiHome,
  MdiCart,
  MdiCardsHeart,
  MdiAccount,
} from "../icones/index";
import { NavLink } from "react-router-dom";
import "./style.css";
export function Sidebar({ isOpen, setIsOpen }) {
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
          cursor: "pointer",
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
            <span>Cart</span>
          </section>
        </NavLink>
        <NavLink to="wishlists">
          <section className="routes">
            <span>
              <MdiCardsHeart width="1rem" height="1rem" />
            </span>
            <span>Wishlists</span>
          </section>
        </NavLink>
        <NavLink to="accounts">
          <section className="routes">
            <span>
              <MdiAccount />
            </span>
            <span>Account</span>
          </section>
        </NavLink>
      </section>
    </section>
  );
}
