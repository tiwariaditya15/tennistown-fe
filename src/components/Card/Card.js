import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthenticationProvider";
import { useStateContext } from "../../context/StateProvider";
import { useInteractions } from "../../context/InteractionProvider";
import { Rating, Loader } from "../Atoms";
import { BxBxRupee } from "../icones";
import { addToCart } from "../../actions/cart";
import { toggleWishlist } from "../../actions/wishslists";
import { ADDING_TO_CART } from "../../constants/interactions";
import { useLocation } from "react-router";
import Wishlist from "../Atoms/Wishlist";
import { ImageSlider } from "./ImageSlider";

export function Card({ item }) {
  const { state, dispatch } = useStateContext();
  const {
    authState: { logged },
  } = useAuthContext();
  const { status, updatingProduct, interactionDispatcher } = useInteractions();
  const { pathname } = useLocation();
  return (
    <section className="card" key={item._id}>
      <section className="card-header">
        {logged && <Wishlist item={item} />}
        <ImageSlider images={item.images} />
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
          <section className="card-actions">
            <section style={{ backgroundColor: "white", border: "none" }}>
              <Loader />
            </section>
          </section>
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
