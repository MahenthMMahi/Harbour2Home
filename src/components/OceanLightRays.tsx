import { useReducedMotion } from "framer-motion";

export function OceanLightRays() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="ocean-light-ray left-[20%] w-[20%] opacity-20"
          style={{ transform: "rotate(14deg)" }}
        />
        <span
          className="ocean-light-ray left-[55%] w-[16%] opacity-15"
          style={{ transform: "rotate(8deg)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <span className="ocean-light-ray ocean-light-ray-1" />
      <span className="ocean-light-ray ocean-light-ray-2" />
      <span className="ocean-light-ray ocean-light-ray-3" />
    </div>
  );
}
