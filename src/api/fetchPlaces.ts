// axios 기본 인스턴스를 설정
// baseURL은 .env에서 설정한 백엔드 API 주소
import axios from "axios";
import type { Place } from "../types/Place";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // 요청 헤더에 JSON 명시
  },
});

// 공통 에러 처리 함수
function handleApiError(error: unknown): string {
  // error가 AxiosError 타입인지 확인
  if (axios.isAxiosError(error)) {
    // 서버가 응답했으나 HTTP 상태 코드가 실패인 경우
    if (error.response) {
      console.error("응답 에러:", error.response.status, error.response.data);
      if (error.response.status === 404) {
        return "리소스를 찾을 수 없습니다 (404)"; // 사용자에게 안내 메시지 표시
      }
      return `서버 오류 발생: ${error.response.status}`;
      // 서버로 요청을 보냈지만 응답이 오지 않은 경우 (네트워크 장애 등)
    } else if (error.request) {
      console.error("요청은 보냈지만 응답 없음:", error.request);
      return "서버와 연결할 수 없습니다. 네트워크 상태를 확인하세요.";
      // 요청을 보내기 전 설정 단계에서 오류가 발생한 경우
    } else {
      console.error("설정 중 에러:", error.message);
      return "알 수 없는 에러가 발생했습니다.";
    }
  } else {
    // Axios 에러가 아닌 경우 (예: 코드 상의 다른 문제)
    console.error("비Axios 에러:", error);
    return "예상치 못한 에러입니다.";
  }
}

// 백엔드에서 전체 맛집 목록과 찜한 맛집 목록을 가져오는 비동기 함수들

// 전체 맛집을 가져오는 함수
export async function fetchAllPlaces(): Promise<Place[]> {
  try {
    const response = await instance.get("/places");
    return response.data.places;
  } catch (error: unknown) {
    const message = handleApiError(error);
    throw new Error(message);
  }
}
// 찜한 맛집 목록 가져오기
export async function fetchLikedPlaces(): Promise<Place[]> {
  try {
    const response = await instance.get(`/users/places`);
    return response.data.places;
  } catch (error: unknown) {
    const message = handleApiError(error);
    throw new Error(message);
  }
}
