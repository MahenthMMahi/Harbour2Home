import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Location } from "../types/location";
import { FindFishClubCta } from "./FindFishClubCta";
import { OceanBackground } from "./OceanBackground";
import { business } from "../config/business";

type HeroProps = {
  preloaded?: Location | null;
  onCtaNode?: (node: HTMLDivElement | null) => void;
};

export function Hero({ preloaded, onCtaNode }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const joinHref = preloaded ? `/club/${preloaded.id}` : "/location";

  return (
    <section className="relative isolate flex min-h-dvh flex-col overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
      <OceanBackground />
      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col items-center text-center">
        <motion.p
          className="text-[0.68rem] font-bold tracking-[0.42em] text-aqua uppercase sm:text-xs"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {business.name}
        </motion.p>
        <motion.p
          className="mt-2 text-[0.7rem] font-medium tracking-[0.38em] text-mist uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {business.tagline}
        </motion.p>

        <motion.h1
          className="mt-7 max-w-[16ch] text-[2.15rem] leading-[1.05] font-bold tracking-[-0.03em] text-ice sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          Fresh from the harbour.
          <br />
          Now on wheels.
        </motion.h1>
        <motion.p
          className="mt-4 max-w-md text-sm text-mist sm:text-base"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
        >
          Today’s catch, brought closer to your home.
        </motion.p>

        {preloaded && (
          <button
            type="button"
            onClick={() => navigate(`/club/${preloaded.id}`)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-deep/60 px-3 py-1.5 text-xs tracking-[0.18em] text-aqua uppercase"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {preloaded.name}
          </button>
        )}

        <motion.p
          className="mt-8 text-[0.68rem] font-medium tracking-[0.28em] text-glow uppercase"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          Your local Fish Club is waiting
        </motion.p>

        <div className="mt-4 flex w-full justify-center">
          <FindFishClubCta
            to={joinHref}
            label={preloaded ? "JOIN" : "FIND MY"}
            sublabel={preloaded ? "FISH CLUB" : "FISH CLUB"}
            onVisibleRef={onCtaNode}
          />
        </div>

        {preloaded ? (
          <p className="mt-4 text-sm text-mist">
            <Link to="/location" className="text-aqua underline-offset-4 hover:underline">
              Change location
            </Link>
          </p>
        ) : (
          <p className="mt-4 text-xs tracking-[0.04em] text-mist/90">
            Fresh catch updates • Arrival times • Local offers
          </p>
        )}
      </div>
    </section>
  );
}
