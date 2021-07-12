import { createContext, useReducer, useContext } from "react";
import { authReducer } from "../reducers/authReducer";
import { login } from "../api/login";
import { useLocation, useNavigate } from "react-router";
import { LOGIN, LOGOUT, SETTOKEN } from "../constants/auth";

const AuthContext = createContext();

export function AuthenticationProvider({ children }) {
  let logged = false;
  let AUTH_TOKEN = null;

  if (localStorage.getItem("logged") === "true") {
    logged = true;
  }

  if (localStorage.getItem("AUTH_TOKEN")) {
    AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
  }

  const [authState, authDispatch] = useReducer(authReducer, {
    logged,
    AUTH_TOKEN,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const loginWithUsernamePassword = async (username, password) => {
    try {
      const res = await login({ username, password });
      if (res.data.status === 200) {
        authDispatch({ type: LOGIN, payload: { success: true } });
        authDispatch({
          type: SETTOKEN,
          payload: { AUTH_TOKEN: res.data.token },
        });
        localStorage.setItem("logged", true);
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        location.state !== null
          ? navigate(`/${location.state?.from}`)
          : navigate("/");
      }
      if (res.data.status === 401) {
        return res.data.status;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("AUTH_TOKEN");
    authDispatch({ type: LOGOUT });
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
