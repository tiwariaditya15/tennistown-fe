import { createContext, useContext, useReducer } from "react";
import { IDLE } from "../constants/interactions";
import { interactionReducer } from "../reducers/interactionReducer";
const InteractionContext = createContext();

export function InteractionProvider({ children }) {
  const [state, interactionDispatcher] = useReducer(interactionReducer, {
    status: IDLE,
    updatingProduct: null,
  });
  return (
    <InteractionContext.Provider
      value={{
        status: state.status,
        updatingProduct: state.updatingProduct,
        interactionDispatcher,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
}

export const useInteractions = () => useContext(InteractionContext);
