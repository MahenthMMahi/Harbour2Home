import { locations } from "../data/locations";
import type { Location } from "../types/location";
import { findNearest, type Coordinates } from "../utils/geo";

/**
 * Location data access.
 * Today this reads static data from `src/data/locations.ts`.
 * Later, these functions can call GET /api/locations without changing the UI.
 */
export function getLocations(): Location[] {
  return locations.filter((location) => location.active);
}

export function getLocationById(id: string | null | undefined): Location | null {
  if (!id) return null;
  const normalised = id.trim().toLowerCase();
  return getLocations().find((location) => location.id === normalised) ?? null;
}

export function searchLocations(query: string): Location[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return getLocations();

  return getLocations().filter((location) => {
    const haystack = [
      location.name,
      location.nameMalayalam,
      location.displayName,
      location.id,
      ...location.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(needle);
  });
}

export function findNearestLocation(origin: Coordinates): Location | null {
  return findNearest(origin, getLocations());
}
