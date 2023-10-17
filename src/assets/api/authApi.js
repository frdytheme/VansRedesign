import axios from "axios";

const authApi = axios.create({
  baseURL: "https://vans-redesign-frdytheme.koyeb.app/api",
  // baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default authApi;
