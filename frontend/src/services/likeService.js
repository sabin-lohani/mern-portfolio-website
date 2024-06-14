import api from "./api";

const toggleLike = (data) => api.post("/likes", data);

export default { toggleLike };
