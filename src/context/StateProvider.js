import { createContext, useReducer, useContext } from "react";
import { stateReducer } from "../reducers/stateReducer";
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
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
