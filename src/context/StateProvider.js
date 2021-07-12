import { createContext, useReducer, useContext, useEffect } from "react";
import { stateReducer } from "../reducers/stateReducer";
import { useAuthContext } from "./AuthenticationProvider";
import { getCart } from "../api/cart";
import { getWishlists } from "../api/wishlists";
import { SETCART } from "../constants/cart";
import { SETWISHLISTS } from "../constants/wishslists";

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

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getCart(AUTH_TOKEN);

        if (res.data.status === 200) {
          dispatch({
            type: SETCART,
            payload: {
              products: res.data.products,
            },
          });
        }
      } catch (error) {
        // TODO: dispatch action saying network error
        console.log({ error });
      }
    }
    fetchCart();
  }, [AUTH_TOKEN]);

  useEffect(() => {
    async function fetchWishlists() {
      try {
        const { data } = await getWishlists(AUTH_TOKEN);

        if (data.status === 200) {
          dispatch({
            type: SETWISHLISTS,
            payload: { wishlists: data.wishlists },
          });
        }
      } catch (error) {
        // TODO: handle req fail when network off
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
