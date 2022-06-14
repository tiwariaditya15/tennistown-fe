import axios from "axios";
import { URL as BaseURL } from "../api/baseURL";
const URL = `${BaseURL}/cart`;

export const getCart = () => axios.get(`${URL}`);

export const addToCart = (productId, quantity) =>
  axios.post(URL, { productId, quantity });

export const updateProduct = (productId, quantity) =>
  axios.post(`${URL}/update`, { productId, quantity });

export const resetCart = () => axios.post(`${URL}/reset`);
