import {
  ADDING_TO_CART,
  UPDATING_QUANTITY,
  UPDATING_WISHLISTS,
  IDLE,
} from "../constants/interactions";
export const interactionReducer = (state, action) => {
  console.log({ action });
  switch (action.type) {
    case ADDING_TO_CART:
      return {
        ...state,
        status: ADDING_TO_CART,
        updatingProduct: action.payload.addingProduct,
      };
    case UPDATING_QUANTITY:
      return {
        ...state,
        status: UPDATING_QUANTITY,
        updatingProduct: action.payload.updatingProduct,
      };
    case UPDATING_WISHLISTS:
      return {
        ...state,
        status: UPDATING_WISHLISTS,
        updatingProduct: action.payload.updatingProduct,
      };
    case IDLE:
      return {
        ...state,
        status: IDLE,
        updatingProduct: null,
      };
    default:
      return { ...state };
  }
};
