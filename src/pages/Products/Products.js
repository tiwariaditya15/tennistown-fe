import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/StateProvider";
import { Filters } from "../../components/Filters";
import { Card } from "../../components/Card";
import { URL } from "../../api/baseURL";
import { getSortedData, getFilteredData } from "./utilityFuntions";
import { useSearchParams } from "react-router-dom";
import "./style.css";

export function Products() {
  const { state, dispatch } = useStateContext();
  const [data, setData] = useState([]);
  const [params] = useSearchParams();

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

  useEffect(() => {
    if (data.length) {
      dispatch({
        type: "CHANGESELECTEDBRAND",
        payload: { brand: params.get("brand") },
      });
    }
  }, [data]);

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
