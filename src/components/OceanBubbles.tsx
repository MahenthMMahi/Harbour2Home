import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { isMobileViewport, visuals } from "../config/visuals";

export function OceanBubbles() {
  const reduceMotion = useReducedMotion();

  const bubbles = useMemo(() => {
    if (reduceMotion) return [];
    const count = isMobileViewport()
      ? visuals.bubbleCount.mobile
      : visuals.bubbleCount.desktop;

    return Array.from({ length: count }, (_, index) => {
      const left = 6 + ((index * 17 + 11) % 86);
      const size = 4 + (index % 4) * 2.5;
      const opacity = 0.15 + (index % 3) * 0.1;
      const delay = index * 1.8;
      const duration = 14 + (index % 4) * 3;

      return {
        id: index,
        left: `${left}%`,
        size,
        opacity,
        delay: `${delay}s`,
        duration: `${duration}s`,
      };
    });
  }, [reduceMotion]);

  if (reduceMotion || bubbles.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble absolute bottom-[-5%] rounded-full border border-aqua/30 bg-glow/10 shadow-[inset_0_0_4px_rgba(103,232,249,0.4)]"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  );
}
