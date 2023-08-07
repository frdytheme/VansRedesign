import axios from "axios";

const authApi = axios.create({
  baseURL: "https://localhost:443/api",
});

export default authApi;
