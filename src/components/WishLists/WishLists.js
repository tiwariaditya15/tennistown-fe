import { useStateContext } from "../../context/StateProvider";
import {
  MdiCardsHeartRed,
  MdiHeartOutline,
  BxBxRupee,
  IcBaselineStar,
  IcBaselineStarBorder,
} from "../icones/index";
import "./style.css";
export default function WishLists({}) {
  const { state, dispatch } = useStateContext();
  console.log({ state });
  return (
    <div className="flex">
      {state.wishlists.map((item) => {
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
                <p class="card-text">{item.brand}</p>
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
                  {item.price.discounted}
                  <span
                    className="offer"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "0.1rem",
                      textDecoration: "line-through",
                    }}
                  >
                    {item.price.retail}
                  </span>
                </p>

                <section class="card-actions">
                  <section
                    onClick={() => {
                      dispatch({ type: "ADDTOCART", payload: { ...item } });
                      dispatch({
                        type: "REMOVEFROMWISHLIST",
                        payload: { ...item },
                      });
                    }}
                  >
                    Add to cart
                  </section>
                </section>
              </section>
            </section>
          </section>
        );
      })}
    </div>
  );
}
