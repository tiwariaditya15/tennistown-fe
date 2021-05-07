import { createContext, useReducer, useContext } from "react";
import { authReducer } from "../reducers/authReducer";
const AuthContext = createContext();

export function AuthenticationProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, { logged: false });
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
