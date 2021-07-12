import {
  UPDATEQUANTITY,
  SETCART,
  ADDTOCART,
  HIGHTOLOW,
  LOWTOHIGH,
  CLEARFILTERS,
  CHANGESELECTEDBRAND,
  CHANGESELECTEDLEVEL,
} from "../constants/cart";
import { SETWISHLISTS } from "../constants/wishslists";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case ADDTOCART:
      return {
        ...state,
        cart: state.cart.some(
          (item) => item.product._id === action.payload.product._id
        )
          ? state.cart
              .filter(
                (product) => product.product._id !== action.payload.product._id
              )
              .concat({ ...action.payload })
              .map(({ product, quantity }) => ({ product, quantity }))
              .reverse()
          : state.cart
              .concat({
                ...action.payload,
              })
              .map(({ product, quantity }) => ({ product, quantity }))
              .reverse(),
      };

    case SETWISHLISTS:
      return {
        ...state,
        wishlists: action.payload
          ? action.payload.wishlists.map(({ product }) => ({
              product,
            }))
          : [],
      };

    case CHANGESELECTEDBRAND:
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedBrand: action.payload.brand,
        },
      };
    case CHANGESELECTEDLEVEL:
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedLevel: action.payload.level,
        },
      };

    case LOWTOHIGH:
      return {
        ...state,
        sortBy: "LOWTOHIGH",
      };
    case HIGHTOLOW:
      return {
        ...state,
        sortBy: "HIGHTOLOW",
      };
    case CLEARFILTERS:
      return {
        ...state,
        filters: {
          selectedBrand: "",
          selectedLevel: "",
        },
      };

    case SETCART:
      return {
        ...state,
        cart: action.payload
          ? action.payload.products.map(({ product, quantity }) => ({
              product,
              quantity,
            }))
          : [],
      };

    case UPDATEQUANTITY:
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          return cartItem.product._id === action.payload.productId
            ? {
                product: { ...cartItem.product },
                quantity: action.payload.quantity,
              }
            : {
                ...cartItem,
              };
        }),
      };

    default:
      return state;
  }
};
