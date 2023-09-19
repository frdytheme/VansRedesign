import axios from "axios";

// 마이페이지 넘어가는 부분 페이지 작업 필요.
// 반응형...??

const authApi = axios.create({
  // baseURL: "https://vans-redesign-frdytheme.koyeb.app/api",
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default authApi;
