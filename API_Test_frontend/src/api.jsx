import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka URL
});

export default api;
