import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/StateProvider";
import { Filters } from "../../components/Filters";
import { Card } from "../../components/Card";
import { URL } from "../../api/baseURL";
import { getSortedData, getFilteredData } from "./utilityFuntions";
import "./style.css";

export function Products() {
  const { state } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/products`)
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
        {filteredData.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </>
  );
}
