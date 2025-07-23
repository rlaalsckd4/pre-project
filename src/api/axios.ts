// axios 기본 인스턴스를 설정
// baseURL은 .env에서 설정한 백엔드 API 주소
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // 요청 헤더에 JSON 명시
  },
});

export default instance;
