import { useReducedMotion } from "framer-motion";

export function OceanCurrent() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 1000 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ocean-current-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="45%" stopColor="#67E8F9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic underwater stream lines */}
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-50 200 C 180 150, 320 270, 540 210 S 840 140, 1050 230"
          fill="none"
          stroke="url(#ocean-current-gradient)"
          strokeWidth="1.2"
        />
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-40 420 C 160 380, 360 480, 600 410 S 880 340, 1060 440"
          fill="none"
          stroke="url(#ocean-current-gradient)"
          strokeWidth="0.9"
          style={{ animationDelay: "2.5s" }}
        />
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-60 700 C 200 640, 420 780, 680 710 S 920 620, 1080 730"
          fill="none"
          stroke="url(#ocean-current-gradient)"
          strokeWidth="0.8"
          style={{ animationDelay: "4.5s" }}
        />

        {/* Gentle distant fish silhouettes gliding in background */}
        {!reduceMotion && (
          <g fill="#021F2E" opacity="0.6">
            <g className="fish-silhouette">
              {/* Fish 1 */}
              <path d="M 0 350 C 15 344, 32 342, 45 350 C 35 354, 25 356, 12 355 Z M 45 350 L 52 344 L 50 350 L 54 354 Z" />
            </g>
            <g className="fish-silhouette-2">
              {/* Fish 2 - slightly deeper and smaller */}
              <path d="M 0 540 C 12 536, 26 534, 36 540 C 28 543, 20 545, 10 544 Z M 36 540 L 42 535 L 40 540 L 44 544 Z" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
