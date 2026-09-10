import { useState, type Ref } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type CinematicCTAProps = {
  to?: string;
  label?: string;
  sublabel?: string;
  onVisibleRef?: Ref<HTMLDivElement>;
  onTriggerTransition?: () => void;
};

export function CinematicCTA({
  to = "/location",
  label = "FIND MY",
  sublabel = "FISH CLUB",
  onVisibleRef,
  onTriggerTransition,
}: CinematicCTAProps) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (clicked) return;
    setClicked(true);

    if (onTriggerTransition) {
      onTriggerTransition();
    }

    const duration = reduceMotion ? 0 : 320;
    window.setTimeout(() => {
      navigate(to);
    }, duration);
  }

  return (
    <motion.div
      ref={onVisibleRef}
      className="portal-shell w-full max-w-sm"
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Light Sweep Orbiting Border */}
      {!reduceMotion && <span className="portal-orbit" />}

      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={`${label} ${sublabel}`}
        className="portal-surface group relative flex min-h-[5.75rem] w-full items-center gap-4 overflow-hidden rounded-full px-5 py-3 text-left transition-all"
        whileHover={reduceMotion ? undefined : { scale: 1.028 }}
        whileTap={reduceMotion ? undefined : { scale: 0.975 }}
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 1px rgba(34,211,238,0.35), 0 0 28px rgba(34,211,238,0.25), 0 18px 40px rgba(1,17,26,0.7)",
                  "0 0 0 1px rgba(103,232,249,0.7), 0 0 46px rgba(34,211,238,0.45), 0 20px 48px rgba(1,17,26,0.8)",
                  "0 0 0 1px rgba(34,211,238,0.35), 0 0 28px rgba(34,211,238,0.25), 0 18px 40px rgba(1,17,26,0.7)",
                ],
              }
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glowing Sub-surface Oceanic Orb */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-aqua/25 blur-md" />
          <span
            className={`relative h-4 w-4 rounded-full bg-aqua shadow-[0_0_18px_#22D3EE] ${
              reduceMotion ? "" : "animate-ping opacity-75"
            }`}
          />
          <span className="relative h-3 w-3 rounded-full bg-ice shadow-[0_0_12px_#67E8F9]" />
        </span>

        {/* Text Content */}
        <span className="min-w-0 flex-1">
          <span className="block text-[0.72rem] font-semibold tracking-[0.28em] text-aqua uppercase">
            {label}
          </span>
          <span className="block text-[1.4rem] leading-none font-bold tracking-[0.08em] text-ice">
            {sublabel}
          </span>
        </span>

        {/* Action Indicator */}
        <motion.span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua transition-transform duration-300 group-hover:bg-aqua/25">
          <ArrowRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </motion.span>

        {/* Water Ripple Effect on Click */}
        {clicked && !reduceMotion && (
          <span className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center overflow-hidden">
            <span className="animate-water-ripple h-32 w-32 rounded-full bg-gradient-to-r from-aqua/50 via-glow/40 to-transparent" />
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
