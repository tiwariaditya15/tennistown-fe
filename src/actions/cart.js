import * as api from "../api/cart";

export const updateProductQuantity = async (
  userId,
  productId,
  quantity,
  dispatch,
  type
) => {
  try {
    const res = await api.updateProduct(userId, productId, quantity);
    console.log({ res });
  } catch (error) {
    console.log({ error });
  }
};
