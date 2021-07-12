import { NavLink, useLocation } from "react-router-dom";
import {
  MdiHeartOutline,
  MdiCardsHeart,
  MdiCart,
  MdiCartOutline,
  MdiLogin,
  MdiMenu,
} from "../icones";
import { useStateContext } from "../../context/StateProvider";
import { useAuthContext } from "../../context/AuthenticationProvider";
import "./style.css";

export function Navbar({ setIsOpen }) {
  const location = useLocation();
  const { state } = useStateContext();
  const {
    authState: { logged },
  } = useAuthContext();
  return (
    <>
      <section className="navbar">
        <section className="main">
          <section
            className="menu"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            <MdiMenu />
          </section>
          <NavLink to="/" className="nav-link nav-brandlogo">
            <span
              style={{
                color: "var(--primary-color)",
              }}
            >
              Tennis
            </span>
            Town
          </NavLink>
        </section>
        <section className="nav-profile">
          <NavLink to="wishlists" className="nav-link">
            <span className="badge-icon">
              {location.pathname === "/wishlists" ? (
                <MdiCardsHeart />
              ) : (
                <MdiHeartOutline />
              )}
              {state.wishlists.length !== 0 && (
                <span className="badge-icon-notification">
                  {state.wishlists.length}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink to="cart" className="nav-link">
            <span className="badge-icon">
              {location.pathname === "/cart" ? <MdiCart /> : <MdiCartOutline />}
              {state.cart.length !== 0 && (
                <span className="badge-icon-notification">
                  {state.cart.filter(({ quantity }) => quantity).length}
                </span>
              )}
            </span>
          </NavLink>
          {!logged && (
            <NavLink to="login" className="nav-link">
              <MdiLogin />
            </NavLink>
          )}
        </section>
      </section>
    </>
  );
}
