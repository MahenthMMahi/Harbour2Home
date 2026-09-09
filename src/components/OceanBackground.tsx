import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { left: "8%", top: "18%", size: 3, delay: "0s" },
  { left: "18%", top: "62%", size: 2, delay: "1.2s" },
  { left: "32%", top: "28%", size: 2, delay: "2.4s" },
  { left: "48%", top: "72%", size: 3, delay: "0.6s" },
  { left: "64%", top: "22%", size: 2, delay: "3s" },
  { left: "74%", top: "58%", size: 2, delay: "1.8s" },
  { left: "86%", top: "36%", size: 3, delay: "2.1s" },
  { left: "92%", top: "78%", size: 2, delay: "0.4s" },
];

const bubbles = [
  { left: "12%", delay: "0s", duration: "16s" },
  { left: "28%", delay: "4s", duration: "18s" },
  { left: "51%", delay: "2s", duration: "14s" },
  { left: "69%", delay: "7s", duration: "20s" },
  { left: "84%", delay: "5s", duration: "15s" },
];

export function OceanBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="ocean-surface absolute inset-0" />
      <div className="light-ray left-[18%]" />
      <div className="light-ray left-[42%] opacity-30" style={{ transform: "rotate(12deg)" }} />
      <div className="light-ray left-[68%] opacity-20" style={{ transform: "rotate(22deg)" }} />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="current" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-40 180 C 120 140, 240 240, 420 190 S 700 120, 860 210"
          fill="none"
          stroke="url(#current)"
          strokeWidth="1.2"
        />
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-20 340 C 160 300, 300 410, 500 350 S 740 300, 880 380"
          fill="none"
          stroke="url(#current)"
          strokeWidth="1"
          style={{ animationDelay: "2s" }}
        />
        <path
          className={reduceMotion ? undefined : "current-line"}
          d="M-60 620 C 140 560, 280 700, 480 640 S 760 560, 900 680"
          fill="none"
          stroke="url(#current)"
          strokeWidth="0.9"
          style={{ animationDelay: "3.4s" }}
        />
        <g fill="#032B3C" opacity="0.55">
          <path d="M90 430c28-8 48-22 78-20 8 12-6 22-24 24-18 2-36-1-54-4Z" />
          <path d="M560 250c22-6 38-16 62-14 6 9-5 16-19 18-16 1-28-1-43-4Z" />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden opacity-70">
        <svg className={`h-full w-[200%] ${reduceMotion ? "" : "wave-band"}`} viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path fill="#032B3C" fillOpacity="0.9" d="M0,96L80,90C160,84,320,72,480,85C640,98,800,138,960,138C1120,138,1280,98,1360,78L1440,58V160H0Z" />
          <path fill="#064B63" fillOpacity="0.45" d="M0,112L120,104C240,96,480,84,720,101C960,118,1200,150,1320,150L1440,150V160H0Z" />
        </svg>
      </div>

      {particles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className={`absolute rounded-full bg-glow ${reduceMotion ? "opacity-30" : "particle"}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}

      {!reduceMotion &&
        bubbles.map((bubble) => (
          <span
            key={bubble.left}
            className="bubble absolute bottom-[-8%] rounded-full border border-aqua/30 bg-glow/10"
            style={{
              left: bubble.left,
              width: 7,
              height: 7,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
            }}
          />
        ))}

      <motion.div
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-abyss to-transparent"
        aria-hidden
      />
    </div>
  );
}
