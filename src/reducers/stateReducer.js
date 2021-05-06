export const stateReducer = (state, action) => {
  switch (action.type) {
    case "ADDTOCART":
      return {
        ...state,
        cart: state.cart.some((item) => item.id === action.payload.id)
          ? [...state.cart]
          : state.cart.concat({ ...action.payload, quantity: 1 }),
      };
    case "INCREASEQUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          return cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : { ...cartItem };
        }),
      };
    case "DECREASEQUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((cartItem) => {
            return cartItem.id === action.payload.id
              ? cartItem.quantity > 0
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : { ...cartItem }
              : { ...cartItem };
          })
          .filter((cartItem) => cartItem.quantity !== 0),
      };
    case "ADDTOWISHLIST":
      return {
        ...state,
        wishlists: state.wishlists.some((item) => item.id === action.payload.id)
          ? [...state.wishlists]
          : state.wishlists.concat(action.payload),
      };
    case "REMOVEFROMWISHLIST":
      return {
        ...state,
        wishlists: state.wishlists.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "REMOVEFROMCART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "CHANGESELECTEDBRAND":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedBrand: action.payload.brand,
        },
      };
    case "CHANGESELECTEDLEVEL":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedLevel: action.payload.level,
        },
      };

    case "LOWTOHIGH":
      return {
        ...state,
        sortBy: "LOWTOHIGH",
      };
    case "HIGHTOLOW":
      return {
        ...state,
        sortBy: "HIGHTOLOW",
      };
    case "CLEARFILTERS":
      return {
        ...state,
        filters: {
          selectedBrand: "",
          selectedLevel: "",
        },
      };
    default:
      return state;
  }
};
