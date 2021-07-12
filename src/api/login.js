import axios from "axios";
import { URL as BaseURL } from "../api/baseURL";

export const login = (credentials) =>
  axios.post(`${BaseURL}/accounts/login`, credentials);

export const signUp = (userData) =>
  axios.post(`${BaseURL}/accounts/emailsignup`, { ...userData });
