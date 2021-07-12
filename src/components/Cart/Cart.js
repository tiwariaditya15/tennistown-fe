import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/StateProvider";
import { useInteractions } from "../../context/InteractionProvider";
import { useAuthContext } from "../../context/AuthenticationProvider";
import { Loader } from "../Atoms/Loader";
import { updateProductQuantity } from "../../actions/cart";
import { toggleWishlist } from "../../actions/wishslists";
import { UPDATING_WISHLISTS } from "../../constants/interactions";
import {
  MdiCardsHeartRed,
  MdiHeartOutline,
  BxBxRupee,
  IcBaselineStar,
  IcBaselineStarBorder,
  IcBaselineAdd,
  IcBaselineRemove,
} from "../icones/index";
import "./style.css";

export function Cart() {
  const { state, dispatch } = useStateContext();
  const { status, updatingProduct, interactionDispatcher } = useInteractions();
  const {
    authState: { userId },
  } = useAuthContext();

  return (
    <>
      <section className="cart-details">
        Subtotal(
        {state.cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}{" "}
        items):
        <span
          style={{
            color: "#ef4444",
          }}
        >
          <BxBxRupee />
          {state.cart.reduce(
            (acc, cur) => acc + cur.product.price.discounted * cur.quantity,
            0
          )}
        </span>
      </section>
      <div className="cart-products flex">
        {state.cart
          .filter(({ quantity }) => quantity)
          .map(({ quantity, product: item }) => {
            return (
              <section class="card">
                <section className="card-header">
                  {state.wishlists.some(
                    (wish) => wish.product._id === item._id
                  ) ? (
                    status === UPDATING_WISHLISTS &&
                    updatingProduct === item._id ? (
                      <Loader classNames="card-header-btn" />
                    ) : (
                      <span
                        onClick={() => {
                          toggleWishlist(
                            userId,
                            item._id,
                            dispatch,
                            interactionDispatcher
                          );
                        }}
                        class="card-header-btn"
                      >
                        <MdiCardsHeartRed />
                      </span>
                    )
                  ) : status === UPDATING_WISHLISTS &&
                    updatingProduct === item._id ? (
                    <Loader classNames="card-header-btn" />
                  ) : (
                    <>
                      <span
                        onClick={() => {
                          toggleWishlist(
                            userId,
                            item._id,
                            dispatch,
                            interactionDispatcher
                          );
                        }}
                        class="card-header-btn"
                      >
                        <MdiHeartOutline />
                      </span>
                    </>
                  )}
                  <img class="card-img" src={item.images[0]} alt="" srcset="" />
                </section>
                <section className="card-body">
                  <section class="card-content">
                    <p class="card-title">{item.name} </p>
                    <p class="card-text">by {item.brand}</p>
                    <span class="card-text rating">
                      <IcBaselineStar />
                      <IcBaselineStar />
                      <IcBaselineStar />
                      <IcBaselineStarBorder />
                      <IcBaselineStarBorder />
                    </span>
                    <span className="card-text">{item.ratings}</span>
                    <p class="card-text flex">
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
                        className="offer"
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
                  <section
                    class="card-actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <section
                      onClick={() => {
                        if (quantity > 0) {
                          updateProductQuantity(
                            userId,
                            item._id,
                            dispatch,
                            interactionDispatcher,
                            quantity - 1
                          );
                        }
                      }}
                    >
                      <IcBaselineRemove />
                    </section>
                    <section
                      style={{
                        all: "unset",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      {quantity}
                    </section>
                    <section
                      onClick={() => {
                        updateProductQuantity(
                          userId,
                          item._id,
                          dispatch,
                          interactionDispatcher,
                          quantity + 1
                        );
                      }}
                    >
                      <IcBaselineAdd />
                    </section>
                  </section>
                </section>
              </section>
            );
          })}
        {state.cart.length === 0 && (
          <>
            <section
              className="card"
              style={{
                color: "var(--gray-dark)",
                minWidth: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <section className="card-body">Cart is empty.</section>
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
    </>
  );
}
