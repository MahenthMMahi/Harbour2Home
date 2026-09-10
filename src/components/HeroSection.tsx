import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Location } from "../types/location";
import { CinematicCTA } from "./CinematicCTA";
import { OceanBackground } from "./OceanBackground";
import { TransitionOverlay } from "./TransitionOverlay";
import { business } from "../config/business";

type HeroSectionProps = {
  preloaded?: Location | null;
  onCtaNode?: (node: HTMLDivElement | null) => void;
};

export function HeroSection({ preloaded, onCtaNode }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const targetHref = preloaded ? `/club/${preloaded.id}` : "/location";

  function handleTransition() {
    setTransitioning(true);
  }

  return (
    <section className="relative isolate flex min-h-dvh flex-col overflow-hidden px-4 pb-12 pt-20 sm:px-6 sm:pt-24">
      {/* Background with video, overlays, light rays, particles, bubbles, and currents */}
      <OceanBackground includeVideo={true} />

      {/* Cinematic Transition Overlay */}
      <TransitionOverlay active={transitioning} />

      {/* Content Container (Layer 5) */}
      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
        {/* Top: Brand & Tagline */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5"
        >
          <p className="text-[0.72rem] font-bold tracking-[0.44em] text-aqua uppercase sm:text-xs drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
            {business.name}
          </p>
          <p className="text-[0.68rem] font-medium tracking-[0.34em] text-mist uppercase sm:text-[0.72rem]">
            {business.tagline}
          </p>
        </motion.div>

        {/* Center: Main Headline */}
        <motion.h1
          className="mt-8 max-w-[16ch] text-[2.25rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-ice sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          FRESH FROM THE
          <br />
          <span className="bg-gradient-to-r from-ice via-glow to-aqua bg-clip-text text-transparent">
            HARBOUR.
          </span>
          <br />
          NOW ON WHEELS.
        </motion.h1>

        {/* Supporting Pitch */}
        <motion.p
          className="mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base font-normal"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          Today's catch, brought closer to your home.
        </motion.p>

        {/* Preloaded Location Badge (e.g. from QR scan) */}
        {preloaded && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5"
          >
            <button
              type="button"
              onClick={() => navigate(`/club/${preloaded.id}`)}
              className="inline-flex items-center gap-2 rounded-full border border-aqua/40 bg-deep/80 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-aqua uppercase shadow-[0_0_16px_rgba(34,211,238,0.2)] hover:border-aqua"
            >
              <MapPin className="h-3.5 w-3.5 text-glow" aria-hidden="true" />
              {preloaded.name}
            </button>
          </motion.div>
        )}

        {/* Waiting Prompt */}
        <motion.p
          className="mt-9 text-[0.7rem] font-semibold tracking-[0.3em] text-glow uppercase"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          Your local Fish Club is waiting
        </motion.p>

        {/* Cinematic Ocean Portal CTA */}
        <div className="mt-4 flex w-full justify-center">
          <CinematicCTA
            to={targetHref}
            label={preloaded ? "JOIN" : "FIND MY"}
            sublabel="FISH CLUB"
            onVisibleRef={onCtaNode}
            onTriggerTransition={handleTransition}
          />
        </div>

        {/* Bottom Metadata & Local Reassurance */}
        {preloaded ? (
          <motion.p
            className="mt-5 text-xs text-mist"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Link
              to="/location"
              className="text-aqua underline-offset-4 hover:underline hover:text-glow transition-colors"
            >
              Change location
            </Link>
          </motion.p>
        ) : (
          <motion.p
            className="mt-5 text-xs font-medium tracking-[0.06em] text-mist/80"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Fresh catch • Arrival times • Local offers
          </motion.p>
        )}
      </div>
    </section>
  );
}
