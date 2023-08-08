import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default authApi;
