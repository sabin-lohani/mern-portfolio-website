import api from "./api";

const createPoll = (data) => api.post("/polls", data);

const getPolls = (params) => api.get("/polls", { params });

const getSinglePoll = (id) => api.get(`/polls/${id}`);

const updatePoll = (id, data) => api.put(`/polls/${id}`, data);

const deletePoll = (id) => api.delete(`/polls/${id}`);

const votePoll = (id, data) => api.post(`/polls/${id}/vote`, data);

export default {
  createPoll,
  getPolls,
  getSinglePoll,
  updatePoll,
  deletePoll,
  votePoll,
};
