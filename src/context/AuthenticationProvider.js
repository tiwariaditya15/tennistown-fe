import { createContext, useReducer, useContext } from "react";
import { authReducer } from "../reducers/authReducer";
import { login, signUp } from "../api/login";
import { useLocation, useNavigate } from "react-router";
import { LOGIN, LOGOUT, SETTOKEN, SIGNUP } from "../constants/auth";

const AuthContext = createContext();

export function AuthenticationProvider({ children }) {
  let logged = false;
  let AUTH_TOKEN_TENNISTOWN = null;

  if (localStorage.getItem("AUTH_TOKEN_TENNISTOWN")) {
    AUTH_TOKEN_TENNISTOWN = localStorage.getItem("AUTH_TOKEN_TENNISTOWN");
    logged = true;
  }

  const [authState, authDispatch] = useReducer(authReducer, {
    logged,
    AUTH_TOKEN_TENNISTOWN,
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
          payload: { AUTH_TOKEN_TENNISTOWN: res.data.token },
        });
        localStorage.setItem("AUTH_TOKEN_TENNISTOWN", res.data.token);
        location.state !== null
          ? navigate(`/${location.state?.from}`)
          : navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUpWithUserData = async (userData) => {
    try {
      const res = await signUp(userData);
      if (res.data.status === 201) {
        authDispatch({ type: SIGNUP, payload: { success: true } });
        authDispatch({
          type: SETTOKEN,
          payload: { AUTH_TOKEN_TENNISTOWN: res.data.token },
        });
        localStorage.setItem("logged", true);
        localStorage.setItem("AUTH_TOKEN_TENNISTOWN", res.data.token);
        navigate("/");
        return;
      }
      return res;
    } catch (error) {
      console.log({ error });
    }
  };

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("AUTH_TOKEN_TENNISTOWN");
    authDispatch({ type: LOGOUT });
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        signUpWithUserData,
        loginWithUsernamePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
