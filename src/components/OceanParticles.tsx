import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { isMobileViewport, visuals } from "../config/visuals";

export function OceanParticles() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    if (reduceMotion) return [];
    const count = isMobileViewport()
      ? visuals.particleCount.mobile
      : visuals.particleCount.desktop;

    return Array.from({ length: count }, (_, index) => {
      // Deterministic spread across screen
      const left = ((index * 31 + 7) % 94) + 3;
      const top = ((index * 47 + 13) % 90) + 5;
      const size = index % 4 === 0 ? 3 : index % 2 === 0 ? 2 : 1.5;
      const opacity = 0.25 + (index % 5) * 0.12;
      const delay = (index % 7) * 0.7;
      const duration = 8 + (index % 6) * 1.5;

      return {
        id: index,
        left: `${left}%`,
        top: `${top}%`,
        size,
        opacity,
        delay: `${delay}s`,
        duration: `${duration}s`,
      };
    });
  }, [reduceMotion]);

  if (reduceMotion || particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute rounded-full bg-glow shadow-[0_0_6px_#67E8F9]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
