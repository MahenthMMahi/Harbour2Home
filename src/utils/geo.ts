export type Coordinates = {
  latitude: number;
  longitude: number;
};

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(from: Coordinates, to: Coordinates): number {
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearest<T extends Coordinates>(
  origin: Coordinates,
  points: T[],
): T | null {
  if (points.length === 0) return null;

  return points.reduce((nearest, point) => {
    const nearestDistance = haversineDistanceKm(origin, nearest);
    const pointDistance = haversineDistanceKm(origin, point);
    return pointDistance < nearestDistance ? point : nearest;
  });
}
