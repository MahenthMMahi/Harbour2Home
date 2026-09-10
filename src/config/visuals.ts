export const heroVideo = {
  enabled: true,
  src: "/videos/ocean-background.mp4",
  srcWebm: "/videos/ocean-background.webm",
  poster: "/images/ocean-poster.webp",
};

export const heroVideoEnabled = heroVideo.enabled;
export const heroVideoSource = heroVideo.src;
export const heroVideoSourceWebm = heroVideo.srcWebm;
export const heroVideoPoster = heroVideo.poster;

export const particleCount = {
  desktop: 32,
  mobile: 14,
};

export const bubbleCount = {
  desktop: 8,
  mobile: 4,
};

export const animationEnabled = true;
export const reducedMotionSupport = true;

export const visuals = {
  heroVideo,
  heroVideoEnabled,
  heroVideoSource,
  heroVideoSourceWebm,
  heroVideoPoster,
  particleCount,
  bubbleCount,
  animationEnabled,
  reducedMotionSupport,
} as const;

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 768px)").matches;
}
