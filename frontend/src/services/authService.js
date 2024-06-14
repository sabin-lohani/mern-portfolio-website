import api from "./api";

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);

export const logoutUser = () => api.post("/auth/logout");

export const fetchUserInfo = () => api.get("/auth");
