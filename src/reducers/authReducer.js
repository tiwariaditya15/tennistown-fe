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
      return {
        ...state,
        AUTH_TOKEN: null,
        logged: false,
      };

    case SETTOKEN:
      return {
        ...state,
        AUTH_TOKEN: action.payload.AUTH_TOKEN,
      };

    default:
      return {
        ...state,
      };
  }
};
