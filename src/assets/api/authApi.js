import axios from "axios";

// 최초 접속 시 필요한 정보 api 요청 후 세션 스토리지에 저장해서 불필요한 api 요청 줄이기.
// 세션 쿠키 제대로 전달되는지 체크 필요 => 회원가입 이메일 인증으로 테스트.
// 마이페이지 넘어가는 부분 페이지 작업 필요.
// 반응형...??


const authApi = axios.create({
  baseURL: "https://vans-redesign-frdytheme.koyeb.app/api",
  withCredentials: true,
});

export default authApi;
