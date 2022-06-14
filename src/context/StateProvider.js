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
    authState: { AUTH_TOKEN_TENNISTOWN },
  } = useAuthContext();

  useInterceptors(axios);

  useEffect(() => {
    async function fetchCart() {
      try {
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
  }, [AUTH_TOKEN_TENNISTOWN]);

  useEffect(() => {
    async function fetchWishlists() {
      try {
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
  }, [AUTH_TOKEN_TENNISTOWN]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
