import { LOGIN, SIGNUP, LOGOUT, SETTOKEN } from "../constants/auth";
export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        logged: true,
      };

    case SIGNUP:
      return {
        logged: true,
      };

    case LOGOUT:
      return {
        logged: false,
        userId: null,
      };

    case SETTOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return {
        ...state,
      };
  }
};
