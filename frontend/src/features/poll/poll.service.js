import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

const getPolls = async () => {
  const response = await api.get("http://localhost:8000/api/v1/polls");
  return response.data;
};

const createPoll = async (data) => {
  const response = await api.post("http://localhost:8000/api/v1/polls", data);
  return response.data;
};

const updatePoll = async (id, data) => {
  const response = await api.put(
    `http://localhost:8000/api/v1/polls/${id}`,
    data
  );
  return response.data;
};

const deletePoll = async (id) => {
  const response = await api.delete(`http://localhost:8000/api/v1/polls/${id}`);
  return response.data;
};

const votePoll = async (id, data) => {
  const response = await api.post(`/api/v1/polls/${id}/vote`, data);
  return response.data;
};

export default {
  getPolls,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
};
