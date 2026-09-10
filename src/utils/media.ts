import { visuals } from "../config/visuals";

type ConnectionLike = {
  saveData?: boolean;
  effectiveType?: string;
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDataSaverOrSlow(): boolean {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: ConnectionLike }).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") return true;
  return false;
}

export function shouldLoadHeroVideo(): boolean {
  if (!visuals.heroVideo.enabled || !visuals.animationEnabled) return false;
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion() && visuals.reducedMotionSupport) return false;
  if (isDataSaverOrSlow()) return false;
  return true;
}

export async function mediaExists(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(url, {
      method: "HEAD",
      cache: "default",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (response.ok) return true;
    if (response.status === 405 || response.status === 501) {
      const getController = new AbortController();
      const getTimer = setTimeout(() => getController.abort(), 2500);
      const getResponse = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-1" },
        cache: "default",
        signal: getController.signal,
      });
      clearTimeout(getTimer);
      return getResponse.ok;
    }
    return false;
  } catch {
    return false;
  }
}
