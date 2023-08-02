import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// Axios 인터셉트 설정 (access_token, refresh_token 처리)
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    .split("=")[1];

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default authApi;
