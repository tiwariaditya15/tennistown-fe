import { createContext, useReducer, useContext, useEffect } from "react";
import { stateReducer } from "../reducers/stateReducer";
import { useAuthContext } from "./AuthenticationProvider";
import { getCart } from "../api/cart";

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
    authState: { userId },
  } = useAuthContext();

  useEffect(() => {
    console.log(userId);
    async function fetchCart() {
      try {
        const res = await getCart(userId);
        console.log(res.data);
        if (res.data.status === 200) {
          dispatch({
            type: "SETCART",
            payload: { products: res.data.cart.products },
          });
        }
      } catch (error) {
        // dispatch action saying network error
      }
    }
    fetchCart();
  }, [userId]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
