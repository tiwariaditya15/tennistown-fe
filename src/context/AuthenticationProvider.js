import { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { login } from "../api/login";
import { useLocation, useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthenticationProvider({ children }) {
  let logged = false;
  let userId = null;

  if (localStorage.getItem("logged") === "true") {
    logged = true;
  }

  if (localStorage.getItem("userId")) {
    userId = localStorage.getItem("userId");
  }

  const [authState, authDispatch] = useReducer(authReducer, {
    logged,
    userId,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const loginWithUsernamePassword = async (username, password) => {
    try {
      const res = await login({ username, password });

      if (res.data.status === 200) {
        authDispatch({ type: "LOGIN", payload: { success: true } });
        authDispatch({
          type: "SETUSERID",
          payload: { userId: res.data.userId },
        });
        localStorage.setItem("logged", true);
        localStorage.setItem("userId", res.data.userId);
        location.state !== null
          ? navigate(`/${location.state?.from}`)
          : navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("login");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, loginWithUsernamePassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
