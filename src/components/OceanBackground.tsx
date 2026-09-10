import { useReducedMotion } from "framer-motion";
import { OceanVideoBackground } from "./OceanVideoBackground";
import { OceanLightRays } from "./OceanLightRays";
import { OceanCurrent } from "./OceanCurrent";
import { OceanParticles } from "./OceanParticles";
import { OceanBubbles } from "./OceanBubbles";

type OceanBackgroundProps = {
  includeVideo?: boolean;
};

export function OceanBackground({ includeVideo = true }: OceanBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Layer: CSS Atmospheric Surface (always present as instant foundation) */}
      <div className="ocean-surface absolute inset-0" />

      {/* Layer 1: Cinematic Video Background with 5-Layer Composite Overlay */}
      {includeVideo && <OceanVideoBackground />}

      {/* Layer 2: Sunlight Rays */}
      <OceanLightRays />

      {/* Layer 3: Ocean Currents and Silhouette Life */}
      <OceanCurrent />

      {/* Layer 4: Plankton / Particles */}
      <OceanParticles />

      {/* Layer 5: Rising Bubbles */}
      <OceanBubbles />

      {/* Layer 6: Subtle Deep Sea Bottom Wave Ambient */}
      <div className="absolute inset-x-0 bottom-0 h-44 overflow-hidden opacity-60">
        <svg
          className={`h-full w-[200%] ${reduceMotion ? "" : "wave-band"}`}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            fill="#021F2E"
            fillOpacity="0.8"
            d="M0,96L80,90C160,84,320,72,480,85C640,98,800,138,960,138C1120,138,1280,98,1360,78L1440,58V160H0Z"
          />
          <path
            fill="#043E52"
            fillOpacity="0.38"
            d="M0,112L120,104C240,96,480,84,720,101C960,118,1200,150,1320,150L1440,150V160H0Z"
          />
        </svg>
      </div>

      {/* Top Abyss Fade for Header Integration */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#01111A] to-transparent opacity-85" />
    </div>
  );
}
