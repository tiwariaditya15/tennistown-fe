import axios from "axios";
import { URL as BaseUrl } from "./baseURL";

const URL = `${BaseUrl}/wishlists`;

export const getWishlists = (userId) => axios.get(`${URL}/${userId}`);

export const toggleWishlist = (userId, productId) =>
  axios.post(`${URL}/update/${userId}`, { productId });
