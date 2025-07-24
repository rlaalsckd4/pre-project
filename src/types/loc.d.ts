import type { Place } from "./Place";

export function sortPlacesByDistance(
  places: Place[],
  lat: number,
  lon: number
): Place[];
