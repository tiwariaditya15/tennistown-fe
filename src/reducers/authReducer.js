export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        logged: true,
      };

    default:
      return {
        ...state,
      };
  }
};
