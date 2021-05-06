import { useStateContext } from "../../context/StateProvider";
import { IlArrowUp } from "../icones/index";

const levels = ["Beginner", "Intermidiate", "Advanced"];
const brands = ["Babolat", "Head", "Wilson", "Artengo", "Yonex"];

export default function Filter({ setModal }) {
  const { state, dispatch } = useStateContext();
  return (
    <section className="filter">
      <h3 className="filter-heading">Brands</h3>
      <section className="chips">
        {brands.map((brand, idx) => {
          return (
            <section
              key={idx}
              className={
                "chip " +
                (state.filters.selectedBrand === brand ? "chip-selected" : "")
              }
              onClick={() =>
                dispatch({ type: "CHANGESELECTEDBRAND", payload: { brand } })
              }
            >
              {brand}
            </section>
          );
        })}
      </section>
      <h3 className="filter-heading">Levels</h3>
      <section className="chips">
        {levels.map((level, idx) => {
          return (
            <section
              key={idx}
              className={
                "chip " +
                (state.filters.selectedLevel === level ? "chip-selected" : "")
              }
              onClick={() =>
                dispatch({ type: "CHANGESELECTEDLEVEL", payload: { level } })
              }
            >
              {level}
            </section>
          );
        })}
      </section>
      <section
        className="sort-items flex"
        style={{
          justifyContent: "space-between",
          margin: "0.6rem auto",
        }}
      >
        <span
          style={{
            padding: "0.4rem",
            border: "1px solid var(--gray-600)",
            color: "var(--gray-600)",
            borderRadius: "0.2rem",
          }}
          onClick={() => dispatch({ type: "CLEARFILTERS" })}
        >
          Clear Filters
        </span>
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
