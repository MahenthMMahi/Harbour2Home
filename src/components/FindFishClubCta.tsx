import { useState, type Ref } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type FindFishClubCtaProps = {
  to: string;
  label?: string;
  sublabel?: string;
  onVisibleRef?: Ref<HTMLDivElement>;
};

export function FindFishClubCta({
  to,
  label = "FIND MY",
  sublabel = "FISH CLUB",
  onVisibleRef,
}: FindFishClubCtaProps) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [rippling, setRippling] = useState(false);

  function activate() {
    if (rippling) return;
    setRippling(true);
    window.setTimeout(
      () => {
        navigate(to);
      },
      reduceMotion ? 0 : 280,
    );
  }

  return (
    <motion.div
      ref={onVisibleRef}
      className="portal-shell w-full max-w-sm"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {!reduceMotion && <span className="portal-orbit" />}
      <motion.button
        type="button"
        onClick={activate}
        aria-label={`${label} ${sublabel}`}
        className="portal-glow group relative flex min-h-[5.6rem] w-full items-center gap-4 overflow-hidden rounded-full bg-deep/90 px-5 text-left"
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 1px rgba(34,211,238,0.35), 0 0 28px rgba(34,211,238,0.22)",
                  "0 0 0 1px rgba(103,232,249,0.7), 0 0 42px rgba(34,211,238,0.42)",
                  "0 0 0 1px rgba(34,211,238,0.35), 0 0 28px rgba(34,211,238,0.22)",
                ],
              }
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-aqua/20 blur-md" />
          <span
            className={`relative h-4 w-4 rounded-full bg-aqua shadow-[0_0_18px_#22D3EE] ${reduceMotion ? "" : "orb-pulse"}`}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.72rem] font-medium tracking-[0.28em] text-mist">{label}</span>
          <span className="block text-[1.35rem] leading-none font-bold tracking-[0.08em] text-ice">
            {sublabel}
          </span>
        </span>
        <motion.span className="flex h-11 w-11 items-center justify-center rounded-full bg-aqua/10 text-aqua">
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </motion.span>

        {rippling && !reduceMotion && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full bg-aqua/20"
            initial={{ opacity: 0.5, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.45 }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
