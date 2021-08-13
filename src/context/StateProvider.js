import { createContext, useReducer, useContext, useEffect } from "react";
import { stateReducer } from "../reducers/stateReducer";
import { useAuthContext } from "./AuthenticationProvider";
import { getCart } from "../api/cart";
import { getWishlists } from "../api/wishlists";
import { SETCART } from "../constants/cart";
import { SETWISHLISTS } from "../constants/wishslists";
import axios from "axios";
import { useInterceptors } from "../hooks";

const StateContext = createContext();

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, {
    cart: [],
    wishlists: [],
    filters: {
      selectedBrand: "",
      selectedLevel: "",
    },
    sortBy: null,
  });

  const {
    authState: { AUTH_TOKEN },
  } = useAuthContext();

  useInterceptors(axios);

  useEffect(() => {
    async function fetchCart() {
      try {
        console.info(AUTH_TOKEN, "before fetchCart()");
        const res = await getCart();

        if (res.data.status === 200) {
          dispatch({
            type: SETCART,
            payload: {
              products: res.data.products,
            },
          });
        }
      } catch (error) {
        // TODO: dispatch action saying network error or 401's
        console.log({ error });
      }
    }
    fetchCart();
  }, [AUTH_TOKEN]);
  console.log({ AUTH_TOKEN });
  useEffect(() => {
    async function fetchWishlists() {
      try {
        console.info(AUTH_TOKEN, "before getWishlists()");
        const { data } = await getWishlists();

        if (data.status === 200) {
          dispatch({
            type: SETWISHLISTS,
            payload: { wishlists: data.wishlists },
          });
        }
      } catch (error) {
        // TODO: handle req fail when network off or 401's
        console.log({ error });
      }
    }
    fetchWishlists();
  }, [AUTH_TOKEN]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
