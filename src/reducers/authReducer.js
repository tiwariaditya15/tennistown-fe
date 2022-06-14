import { LOGIN, SIGNUP, LOGOUT, SETTOKEN } from "../constants/auth";
export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logged: true,
      };

    case SIGNUP:
      return {
        ...state,
        logged: true,
      };

    case LOGOUT:
      localStorage.removeItem("AUTH_TOKEN_TENNISTOWN");
      return {
        ...state,
        AUTH_TOKEN_TENNISTOWN: null,
        logged: false,
      };

    case SETTOKEN:
      return {
        ...state,
        AUTH_TOKEN_TENNISTOWN: action.payload.AUTH_TOKEN_TENNISTOWN,
      };

    default:
      return {
        ...state,
      };
  }
};
