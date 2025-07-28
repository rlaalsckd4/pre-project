import { likePlace, unlikePlace } from "../api/fetchPlaces";
import type { Place } from "../types/Place";

// 개별 맛집 카드 컴포넌트
export default function RestaurantCard({
  place,
  onLike,
  isLiked,
}: {
  place: Place;
  onLike?: () => void;
  isLiked?: boolean; //  찜 여부
}) {
  const handleClick = async () => {
    try {
      if (isLiked) {
        await unlikePlace(place.id);
      } else {
        await likePlace(place);
      }
      onLike?.();
    } catch (e) {
      alert("찜 처리 실패");
    }
  };
  // 이미지 URL 구성 ( 백엔드 서버에서 제공하는 이미지 경로 )
  const imageUrl = place.image?.src
    ? `${import.meta.env.VITE_API_BASE_URL}/${place.image.src}`
    : "/fallback.jpg";

  const altText = place.image?.alt ?? "맛집 이미지";

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group bg-gray-800 text-gray-100">
      {/* 맛집 이미지 */}
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* 하단에 맛집 제목 표시 */}
      <div className="absolute bottom-0 w-full bg-gray-900/70 text-center py-1 text-sm font-medium text-gray-100">
        {place.title}
      </div>
      {/* 찜하기 버튼 (아직 기능 없음) */}
      <button
        className="absolute top-2 right-2 btn btn-sm btn-circle bg-gray-700/80 text-white hover:bg-gray-600"
        aria-label="찜하기"
        onClick={handleClick}
      >
        {isLiked ? "💔" : "❤️"}
      </button>
    </div>
  );
}
