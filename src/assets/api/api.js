import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:443/api", // 서버 기본 주소
});

export default api;
