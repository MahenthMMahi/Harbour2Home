import { useEffect, useRef, useState } from "react";
import { heroVideo } from "../config/visuals";
import { mediaExists, shouldLoadHeroVideo } from "../utils/media";

type VideoState = "loading" | "loaded" | "unavailable";

export function OceanVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<VideoState>("loading");
  const [sources, setSources] = useState<{ mp4?: string; webm?: string }>({});

  useEffect(() => {
    let active = true;

    async function evaluateVideo() {
      if (!shouldLoadHeroVideo()) {
        if (active) setState("unavailable");
        return;
      }

      const [webmAvailable, mp4Available] = await Promise.all([
        mediaExists(heroVideo.srcWebm),
        mediaExists(heroVideo.src),
      ]);

      if (!active) return;

      if (!webmAvailable && !mp4Available) {
        setState("unavailable");
        return;
      }

      setSources({
        webm: webmAvailable ? heroVideo.srcWebm : undefined,
        mp4: mp4Available ? heroVideo.src : undefined,
      });
    }

    void evaluateVideo();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || state === "unavailable") return;
    if (!sources.mp4 && !sources.webm) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setState("loaded");
        })
        .catch(() => {
          // Autoplay was blocked or decode error occurred; fall back seamlessly
          setState("unavailable");
        });
    }
  }, [sources, state]);

  if (state === "unavailable") {
    // Return null so the CSS/SVG atmospheric ocean background takes over seamlessly
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Poster Image (visible immediately while loading or as fallback) */}
      <img
        src={heroVideo.poster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          state === "loaded" ? "opacity-35" : "opacity-100"
        }`}
      />

      {/* Layer 1b: Realistic Looping Underwater Video */}
      {(sources.webm || sources.mp4) && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            state === "loaded" ? "opacity-60" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroVideo.poster}
          onCanPlayThrough={() => setState("loaded")}
          onPlaying={() => setState("loaded")}
          onError={() => setState("unavailable")}
        >
          {sources.webm && <source src={sources.webm} type="video/webm" />}
          {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
        </video>
      )}

      {/* Layer 2: Dark Navy Gradient Overlay */}
      <div className="ocean-layer-dark absolute inset-0" />

      {/* Layer 3: Subtle Cyan Radial Glow */}
      <div className="ocean-layer-radial absolute inset-0" />

      {/* Layer 4: Cinematic Vignette */}
      <div className="ocean-layer-vignette absolute inset-0" />
    </div>
  );
}
