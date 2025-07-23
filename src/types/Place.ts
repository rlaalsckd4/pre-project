// 맛집 데이터 타입 정의

export type Place = {
  id: string; // 고유 ID
  title: string; // 맛집 이름
  image: {
    src: string; // 이미지 파일 경로
    alt: string; // 대체 텍스트
  };
  lat: number; // 위도
  lon: number; // 경도
  description: string; // 설명
};
