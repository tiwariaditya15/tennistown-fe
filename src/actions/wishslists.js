import * as api from "../api/wishlists";
import { SETWISHLISTS } from "../constants/wishslists";
import { IDLE, UPDATING_WISHLISTS } from "../constants/interactions";
export const toggleWishlist = async (
  productId,
  dispatch,
  interactionDispatcher
) => {
  try {
    interactionDispatcher({
      type: UPDATING_WISHLISTS,
      payload: { updatingProduct: productId },
    });
    const { data } = await api.toggleWishlist(productId);
    if (data.status === 200) {
      dispatch({ type: SETWISHLISTS, payload: { wishlists: data.wishlists } });
      interactionDispatcher({
        type: IDLE,
      });
    } else {
      console.log({ data });
    }
  } catch (error) {
    console.log({ error });
    interactionDispatcher({
      type: IDLE,
    });
  }
};
