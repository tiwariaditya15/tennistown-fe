import { useStateContext } from "../../context/StateProvider";
import { Card } from "../Card";
import { NavLink } from "react-router-dom";
import "./style.css";

export function WishLists() {
  const { state } = useStateContext();

  return (
    <div className="flex">
      {state.wishlists.map(({ product }) => (
        <Card item={product} key={product._id} />
      ))}
      {state.wishlists.length === 0 && (
        <>
          <section
            className="card"
            style={{
              color: "var(--gray-dark)",
              minWidth: "100%",
            }}
          >
            <section className="card-body">Wishlists is empty.</section>
          </section>
          <section
            className="btn"
            style={{ backgroundColor: "var(--gray-600)" }}
          >
            <NavLink to="/products" className="btn__link">
              Go to Shop
            </NavLink>
          </section>
        </>
      )}
    </div>
  );
}
