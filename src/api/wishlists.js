import axios from "axios";
import { URL as BaseUrl } from "./baseURL";

const URL = `${BaseUrl}/wishlists`;

export const getWishlists = () => axios.get(`${URL}`);

export const toggleWishlist = (productId) =>
  axios.post(`${URL}/update`, { productId });
