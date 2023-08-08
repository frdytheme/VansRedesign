import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 서버 기본 주소
});

export default api;
