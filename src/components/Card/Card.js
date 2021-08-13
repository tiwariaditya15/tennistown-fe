import { useState } from "react";
import { useAuthContext } from "../../context/AuthenticationProvider";
import { useStateContext } from "../../context/StateProvider";
import { useInteractions } from "../../context/InteractionProvider";
import { Rating, Loader } from "../Atoms";
import { MdiCardsHeartRed, MdiHeartOutline, BxBxRupee } from "../icones";
import { addToCart } from "../../actions/cart";
import { toggleWishlist } from "../../actions/wishslists";
import {
  ADDING_TO_CART,
  UPDATING_WISHLISTS,
} from "../../constants/interactions";
import { useLocation } from "react-router";

export function Card({ item }) {
  const [index, setIndex] = useState(0);
  const { state, dispatch } = useStateContext();
  const {
    authState: { userId },
  } = useAuthContext();
  const { status, updatingProduct, interactionDispatcher } = useInteractions();
  const { pathname } = useLocation();

  return (
    <section className="card" key={item._id}>
      <section className="card-header">
        {state.wishlists.some((wish) => wish.product._id === item._id) ? (
          status === UPDATING_WISHLISTS && updatingProduct === item._id ? (
            <Loader classNames="card-header-btn" />
          ) : (
            <span
              onClick={() => {
                toggleWishlist(item._id, dispatch, interactionDispatcher);
              }}
              className="card-header-btn"
            >
              <MdiCardsHeartRed />
            </span>
          )
        ) : status === UPDATING_WISHLISTS && updatingProduct === item._id ? (
          <Loader classNames="card-header-btn" />
        ) : (
          <>
            <span
              onClick={() => {
                toggleWishlist(item._id, dispatch, interactionDispatcher);
              }}
              className="card-header-btn"
            >
              <MdiHeartOutline />
            </span>
          </>
        )}
        <img className="card-img" src={item.images[0]} alt="" />
      </section>
      <section className="card-body">
        <section className="card-content">
          <p className="card-title">{item.name} </p>
          <p className="card-text">by {item.brand}</p>
          <Rating rating={item.ratings} />
          <p className="card-text flex">
            <span
              style={{
                color: "#ef4444",
              }}
            >
              <BxBxRupee />
            </span>
            <span
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {item.price.discounted}
            </span>
            <span
              className="card-text offer"
              style={{
                display: "flex",
                alignItems: "flex-end",
                padding: "0.1rem",
              }}
            >
              <strike>
                {item.price.retail !== item.price.discounted
                  ? item.price.retail
                  : null}
              </strike>
            </span>
          </p>
        </section>
        {status === ADDING_TO_CART && updatingProduct === item._id ? (
          <Loader />
        ) : (
          <section className="card-actions">
            <section
              onClick={() => {
                let quantity = state.cart.reduce((quantity, cur) => {
                  return cur.product._id === item._id ? cur.quantity : quantity;
                }, 0);
                addToCart(
                  item._id,
                  dispatch,
                  interactionDispatcher,
                  ++quantity
                );
                if (pathname === "/wishlists")
                  toggleWishlist(item._id, dispatch, interactionDispatcher);
              }}
            >
              Add to cart
            </section>
          </section>
        )}
        <section className="card-footer">
          <p>Get it within 0 days</p>
        </section>
      </section>
    </section>
  );
}
