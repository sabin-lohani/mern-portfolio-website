import axios from "axios";

const api = axios.create({
  baseURL: "https://himalgajurel-website.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
