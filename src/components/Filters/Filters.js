import "./style.css";
import { IcRoundSort, MdiFilter } from "../icones/index";
import { useState } from "react";
import Sort from "./Sort";
import Filter from "./Filter";
export default function Filters({}) {
  const [modal, setModal] = useState({ sort: false, filters: false });
  return (
    <>
      <section className="section-filter">
        <section
          onClick={() => setModal({ sort: !modal.sort, filters: false })}
        >
          <span>
            <IcRoundSort />
            Sort
          </span>
        </section>
        <section
          onClick={() => setModal({ filters: !modal.filters, sort: false })}
        >
          <span>
            <MdiFilter />
            Filter
          </span>
        </section>
      </section>
      {modal.sort && <Sort setModal={setModal} />}
      {modal.filters && <Filter setModal={setModal} />}
    </>
  );
}
