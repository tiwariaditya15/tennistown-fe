import { useStateContext } from "../../context/StateProvider";
import { useAuthContext } from "../../context/AuthenticationProvider";
import { updateProductQuantity } from "../../actions/cart";
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

export default function Cart({}) {
  const { state, dispatch } = useStateContext();
  const { userId } = useAuthContext;
  console.log(state.cart, userId);
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
            (acc, cur) => acc + cur.productId.price.discounted * cur.quantity,
            0
          )}
        </span>
      </section>
      <div className="flex">
        {state.cart.map(({ quantity, productId: item }) => {
          return (
            <section class="card">
              <section className="card-header">
                {state.wishlists.some((wish) => wish._id === item._id) ? (
                  <span
                    onClick={() =>
                      dispatch({
                        type: "REMOVEFROMWISHLIST",
                        payload: { ...item },
                      })
                    }
                    class="card-header-btn"
                  >
                    <MdiCardsHeartRed />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      dispatch({ type: "ADDTOWISHLIST", payload: { ...item } });
                      dispatch({
                        type: "REMOVEFROMCART",
                        payload: { ...item },
                      });
                    }}
                    class="card-header-btn"
                  >
                    <MdiHeartOutline />
                  </span>
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
                      console.log({
                        userId,
                        productId: item._id,
                        quantity: quantity - 1,
                      });
                      updateProductQuantity(
                        userId,
                        item._id,
                        quantity - 1,
                        dispatch,
                        "UPDATEQUANTITY"
                      );
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
                    onClick={() =>
                      updateProductQuantity(
                        userId,
                        item._id,
                        quantity + 1,
                        "UPDATEQUANTITY"
                      )
                    }
                  >
                    <IcBaselineAdd />
                  </section>
                </section>
              </section>
            </section>
          );
        })}
      </div>
    </>
  );
}
