import axios from "axios";

const URL = "http://localhost:5000/accounts/login";

export const login = (credentials) => axios.post(URL, credentials);
