import { useEffect } from "react";
import { useAuthContext } from "../context/AuthenticationProvider";

const UNAUTHORIZED = 401;
export function useInterceptors(axios) {
  const {
    authState: { AUTH_TOKEN },
  } = useAuthContext();
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        if (AUTH_TOKEN) config.headers.Authorization = AUTH_TOKEN;
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
          localStorage.removeItem("logged");
          localStorage.removeItem("AUTH_TOKEN");
        }
        return Promise.reject(error);
      }
    );
  }, [AUTH_TOKEN]);
}
