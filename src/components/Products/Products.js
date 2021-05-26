import { useStateContext } from "../../context/StateProvider";
import Filters from "../Filters/Filters";
import {
  MdiCardsHeartRed,
  MdiHeartOutline,
  IcBaselineStar,
  IcBaselineStarBorder,
  BxBxRupee,
} from "../icones";
import "./style.css";
import { useEffect, useState } from "react";
import { getSortedData, getFilteredData } from "./utilityFuntions";
import axios from "axios";

export default function Products() {
  const { state, dispatch } = useStateContext();
  const [message, setMessage] = useState(false);
  const [data, setData] = useState([]);

  const handleAddToCart = () => {
    setMessage((msg) => !msg);
    setTimeout(() => setMessage((msg) => !msg), 3000);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        if (res.data.products.length) {
          setData(res.data.products);
        }
      })
      .catch((error) => console.log({ error }));
  }, []);

  const sortedData = getSortedData(state.sortBy, data);
  const filteredData = getFilteredData(state.filters, sortedData);

  return (
    <>
      <Filters />
      <div className="products flex">
        {!data.length && <section className="loader"></section>}
        {filteredData.map((item) => {
          return (
            <section class="card" key={item._id}>
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
      </div>
      {message && (
        <section class="snackbar snackbar-success">
          <span>Added to cart</span>
        </section>
      )}
    </>
  );
}
