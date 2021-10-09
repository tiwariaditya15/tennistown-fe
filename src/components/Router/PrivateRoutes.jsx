import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthenticationProvider";

export default function PrivateRoutes({ path, ...props }) {
  const { authState } = useAuthContext();
  // console.log(authState.logged);
  return authState.logged ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace={true} state={{ from: path }} to="/login" />
  );
}
