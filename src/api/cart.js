import axios from "axios";

const URL = "http://localhost:5000/cart";

export const getCart = (userId) => axios.get(`${URL}/${userId}`);

export const updateProduct = (userId, productId, quantity) =>
  axios.post(`${URL}/update/${userId}`, { productId, quantity });
