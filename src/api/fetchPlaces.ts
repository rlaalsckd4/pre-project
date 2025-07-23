// API 서버 기본 주소
const BASE_URL = "http://localhost:3000";

// 전체 맛집을 가져오는 함수
export async function fetchPlaces() {
  const response = await fetch(`${BASE_URL}/places`); // places 엔드포인트 호출
  if (!response.ok) {
    throw new Error("서버 응답 실패"); // 에러 처리
  }
  const data = await response.json(); // JSON 형태로 응답 받기
  return data.places; // places만 추출해서 반환하기
}
