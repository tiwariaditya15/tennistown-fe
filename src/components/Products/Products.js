import { useStateContext } from "../../context/StateProvider";
import Filters from "../Filters/Filters";
import { products as data } from "../../Data/Products";
import {
  MdiCardsHeartRed,
  MdiHeartOutline,
  IcBaselineStar,
  IcBaselineStarBorder,
  BxBxRupee,
} from "../icones";
import "./style.css";
import { useState } from "react";
import { getSortedData, getFilteredData } from "./utilityFuntions";

export default function Products({}) {
  const { state, dispatch } = useStateContext();
  const [message, setMessage] = useState(false);

  const handleAddToCart = () => {
    setMessage((msg) => !msg);
    setTimeout(() => setMessage((msg) => !msg), 3000);
  };

  console.log({ data });

  const sortedData = getSortedData(state.sortBy, data);
  const filteredData = getFilteredData(state.filters, sortedData);
  console.log({ filteredData });
  return (
    <>
      <Filters />
      <div className="products flex">
        {filteredData.map((item) => {
          return (
            <section class="card" key={item.id}>
              <section className="card-header">
                {state.wishlists.some((wish) => wish.id === item.id) ? (
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
                    onClick={() =>
                      dispatch({ type: "ADDTOWISHLIST", payload: { ...item } })
                    }
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
                <section class="card-actions">
                  <section
                    onClick={() => {
                      handleAddToCart();
                      dispatch({ type: "ADDTOCART", payload: { ...item } });
                    }}
                  >
                    Add to cart
                  </section>
                </section>
                <section className="card-footer">
                  <p>Get it within 0 days</p>
                </section>
              </section>
            </section>
          );
        })}
        {message && (
          <section class="snackbar snackbar-success">
            <span>Added to cart</span>
          </section>
        )}
      </div>
    </>
  );
}
