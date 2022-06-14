import { useEffect } from "react";
import { LOGOUT } from "../constants/auth";
import { useAuthContext } from "../context/AuthenticationProvider";

const UNAUTHORIZED = 401;
export function useInterceptors(axios) {
  const {
    authState: { AUTH_TOKEN_TENNISTOWN },
    authDispatch,
  } = useAuthContext();
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        if (AUTH_TOKEN_TENNISTOWN)
          config.headers.Authorization = AUTH_TOKEN_TENNISTOWN;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === UNAUTHORIZED) {
          localStorage.removeItem("AUTH_TOKEN_TENNISTOWN");
          authDispatch({ type: LOGOUT });
        }
        return Promise.reject(error);
      }
    );
  }, [AUTH_TOKEN_TENNISTOWN]);
}
