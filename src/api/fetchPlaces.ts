// 백엔드에서 전체 맛집 목록과 찜한 맛집 목록을 가져오는 비동기 함수들

import axios from "axios";
import type { Place } from "../types/Place";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// 전체 맛집을 가져오는 함수
export async function fetchAllPlaces(): Promise<Place[]> {
  const response = await axios.get(`${BASE_URL}/places`);
  return response.data.places; // places 필드만 반환
}
// 찜한 맛집 목록 가져오기
export async function fetchLikedPlaces(): Promise<Place[]> {
  const response = await axios.get(`${BASE_URL}/users/places`);
  return response.data.places;
}
