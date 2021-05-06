import { IlArrowUp } from "../icones/index";
import { useStateContext } from "../../context/StateProvider";
import "./style.css";
export default function Sort({ setModal }) {
  const { state, dispatch } = useStateContext();
  return (
    <section
      className="flex-column sort"
      onClick={() => setModal({ sort: false, filter: false })}
    >
      <section
        className="sort-items"
        onChange={() => dispatch({ type: "LOWTOHIGH" })}
      >
        <span>
          <input
            type="radio"
            name="sort"
            checked={state.sortBy === "LOWTOHIGH" ? true : false}
            readOnly={true}
          />
        </span>
        <span>Low to High</span>
      </section>
      <section
        className="sort-items"
        onChange={() => dispatch({ type: "HIGHTOLOW" })}
      >
        <span>
          <input
            type="radio"
            name="sort"
            checked={state.sortBy === "HIGHTOLOW" ? true : false}
            readOnly={true}
          />
        </span>
        <span>High to Low</span>
      </section>
      <section
        className="sort-items"
        onChange={() => dispatch({ type: "BESTSELLER" })}
      >
        <span>
          <input
            type="radio"
            name="sort"
            checked={state.sortBy === "BESTSELLER" ? true : false}
            readOnly={true}
          />
        </span>
        <span>Best Seller</span>
      </section>
      <section
        className="sort-items"
        onChange={() => dispatch({ type: "HIGHESTRATED" })}
      >
        <span>
          <input
            type="radio"
            name="sort"
            checked={state.sortBy === "HIGHESTRATED" ? true : false}
            readOnly={true}
          />
        </span>
        <span>Highest Rated</span>
      </section>
      <section
        className="sort-items flex"
        style={{
          justifyContent: "space-between",
        }}
      >
        <span></span>
        <span
          style={{
            padding: "0.4rem",
            cursor: "pointer",
          }}
          onClick={() => setModal({ sort: false, filter: false })}
        >
          <IlArrowUp />
        </span>
      </section>
    </section>
  );
}
