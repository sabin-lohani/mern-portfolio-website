import api from "./api";

const createComment = (data) => api.post("/comments", data);

const getComments = (data) => api.get(`/comments`, { params: data });

const deleteComment = (id) => api.delete(`/comments/${id}`);

const updateComment = (data) => api.patch(`/comments/${data.id}`, data);

export default { createComment, getComments, deleteComment, updateComment };
