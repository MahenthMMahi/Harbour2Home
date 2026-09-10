import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Location } from "../types/location";

type LocationCardProps = {
  location: Location;
  index?: number;
};

export function LocationCard({ location, index = 0 }: LocationCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
    >
      <Link
        to={`/club/${location.id}`}
        className="card-ocean group relative flex min-h-24 items-center justify-between overflow-hidden rounded-3xl p-5 text-ice"
      >
        <div className="flex flex-col gap-2">
          {/* Header indicator */}
          <div className="flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.24em] text-aqua uppercase">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
            </span>
            <span>Location Found</span>
          </div>

          {/* Location Title & Subtitle */}
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-aqua drop-shadow-[0_0_8px_#22D3EE]" aria-hidden="true" />
            <div>
              <span className="block text-xl font-bold tracking-[0.14em] text-ice uppercase">
                {location.name}
              </span>
              <span className="block text-xs font-medium tracking-wide text-mist">
                FISH CLUB · {location.nameMalayalam}
              </span>
            </div>
          </div>
        </div>

        {/* Right Arrow Portal */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-aqua/30 bg-ocean/30 text-aqua transition-all duration-300 group-hover:border-aqua group-hover:bg-aqua/20 group-hover:text-glow">
          <ArrowRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}
