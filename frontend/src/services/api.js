import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/api/v1/auth/google?code=${code}`);
