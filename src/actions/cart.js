import * as api from "../api/cart";
import { ADDTOCART, UPDATEQUANTITY } from "../constants/cart";
import {
  ADDING_TO_CART,
  IDLE,
  UPDATING_QUANTITY,
} from "../constants/interactions";
export const addToCart = async (
  userId,
  productId,
  dispatch,
  interactionDispatcher,
  quantity = 1
) => {
  const cartId = localStorage.getItem("cartId");
  try {
    interactionDispatcher({
      type: ADDING_TO_CART,
      payload: { addingProduct: productId },
    });
    const { data } = await api.addToCart(userId, cartId, productId, quantity);
    if (data.status === 200) {
      dispatch({
        type: ADDTOCART,
        payload: {
          product: data.updatedProduct.product,
          quantity: data.updatedProduct.quantity,
        },
      });
    }
  } catch (error) {
    console.log({ error });
  } finally {
    interactionDispatcher({ type: IDLE });
  }
};

export const updateProductQuantity = async (
  userId,
  productId,
  dispatch,
  interactionDispatcher,
  quantity
) => {
  try {
    interactionDispatcher({
      type: UPDATING_QUANTITY,
      payload: { updatingProduct: productId },
    });
    const { data } = await api.updateProduct(userId, productId, quantity);
    if (data.status === 200) {
      return dispatch({
        type: UPDATEQUANTITY,
        payload: { productId: data.product, quantity: data.quantity },
      });
    }
    // TODO: dispatch action saying couldn't find cart with userId
  } catch (error) {
    console.log({ error });
  } finally {
    interactionDispatcher({ type: IDLE });
  }
};
