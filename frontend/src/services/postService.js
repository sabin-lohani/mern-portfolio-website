import api from "./api";

const createPost = (data) => api.post("/posts", data);

const getPosts = (params) => api.get("/posts", { params });

const deletePost = (id) => api.delete(`/posts/${id}`);

const deleteImage = (postId, imageId) =>
  api.delete(`/posts/${postId}/images/${imageId}`);

const getPost = (id) => api.get(`/posts/${id}`);

const updatePost = (id, data) => api.patch(`/posts/${id}`, data);

export default {
  createPost,
  getPosts,
  deletePost,
  deleteImage,
  getPost,
  updatePost,
};
