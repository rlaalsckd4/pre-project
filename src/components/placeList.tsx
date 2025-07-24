import { useEffect, useState } from "react";
import type { Place } from "../types/Place";
import Page from "./page";
import Section from "./section";
import RestaurantCard from "./restaurantCard";
import { fetchAllPlaces, fetchLikedPlaces } from "../api/fetchPlaces";
import { sortPlacesByDistance } from "../types/loc";

export default function PlaceList() {
  // 전체 맛집과 찜한 맛집 상태 저장
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [likedPlaces, setLikedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메시지 상태

  // 컴포넌트 마운트 시 API 호출
  // 브라우저의 geolocation API를 사용해 현재 위치 정보를 가져옴
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords; // 위도(latitude), 경도(longitude) 좌표 추출

        // 두 개의 API 요청을 동시에 실행하고, 완료되면 상태에 반영
        try {
          const [allData, likedData] = await Promise.all([
            fetchAllPlaces(),
            fetchLikedPlaces(),
          ]);
          // 현재 위치 기준 거리순 정렬
          const sortedAll = sortPlacesByDistance(allData, latitude, longitude);
          const sortedLiked = sortPlacesByDistance(
            likedData,
            latitude,
            longitude
          );

          // 데이터를 상태에 저장, 에러 발생 시 메시지 표시, 로딩 상태 종료
          setAllPlaces(sortedAll);
          setLikedPlaces(sortedLiked);
        } catch (error: any) {
          setErrorMsg(error.message || "데이터를 불러오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      },
      // 위치 정보 접근이 거부되었거나 실패했을 때 에러 처리
      (error) => {
        console.error("위치 정보 가져오기 실패:", error);
        setErrorMsg("위치 정보 사용을 허용해야 거리순 정렬이 가능합니다.");
        setLoading(false);
      }
    );
  });

  // useEffect(() => {
  //   Promise.all([fetchAllPlaces(), fetchLikedPlaces()])
  //     .then(([allData, likedData]) => {
  //       // 받아온 데이터를 상태에 저장
  //       setAllPlaces(allData);
  //       setLikedPlaces(likedData);
  //     })
  //     .catch((error: Error) => setErrorMsg(error.message)) // 에러 로그 출력
  //     .finally(() => setLoading(false)); // 로딩 완료
  // }, []);

  if (loading)
    return <p className="text-center">맛집을 불러오는 중입니다...</p>;

  return (
    <Page>
      {/* ❤️ 찜한 맛집 섹션 */}
      <Section title="❤️ 찜 목록">
        {likedPlaces.length === 0 ? (
          <p className="text-center text-gray-400">
            아직 찜한 맛집이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedPlaces.map((place) => (
              <RestaurantCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </Section>
      {/* 🍽️ 전체 맛집 목록 섹션 */}
      <Section title="🍽️ 전체 맛집 목록">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allPlaces.map((place) => (
            <RestaurantCard key={place.id} place={place} />
          ))}
        </div>
      </Section>
      {errorMsg && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {errorMsg}
        </p>
      )}
    </Page>
  );
}
