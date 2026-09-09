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
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
    >
      <Link
        to={`/club/${location.id}`}
        className="card-ocean group flex min-h-20 items-center justify-between rounded-3xl px-4 py-4 text-ice"
      >
        <span className="flex items-start gap-3">
          <MapPin className="mt-1 h-4 w-4 text-aqua" aria-hidden="true" />
          <span>
            <span className="block text-lg font-bold tracking-[0.12em] uppercase">{location.name}</span>
            <span className="block text-sm text-mist">Fish Club · {location.nameMalayalam}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.22em] text-aqua uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_8px_#22D3EE]" />
              Active
            </span>
          </span>
        </span>
        <ArrowRight className="h-5 w-5 text-aqua transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
