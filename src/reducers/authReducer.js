export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        logged: true,
      };

    case "SIGNUP":
      return {
        logged: true,
      };

    case "LOGOUT":
      return {
        logged: false,
      };

    case "SETUSERID":
      return {
        ...state,
        userId: action.payload.userId,
      };

    default:
      return {
        ...state,
      };
  }
};
