import * as api from "../api/cart";
import { ADDTOCART, UPDATEQUANTITY } from "../constants/cart";
import {
  ADDING_TO_CART,
  IDLE,
  UPDATING_QUANTITY,
} from "../constants/interactions";
export const addToCart = async (
  productId,
  dispatch,
  interactionDispatcher,
  quantity = 1
) => {
  try {
    interactionDispatcher({
      type: ADDING_TO_CART,
      payload: { addingProduct: productId },
    });
    const { data } = await api.addToCart(productId, quantity);
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
    const { data } = await api.updateProduct(productId, quantity);
    if (data.status === 200) {
      return dispatch({
        type: UPDATEQUANTITY,
        payload: { productId: data.product, quantity: data.quantity },
      });
    }
  } catch (error) {
    console.log({ error });
  } finally {
    interactionDispatcher({ type: IDLE });
  }
};
