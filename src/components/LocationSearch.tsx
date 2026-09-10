import { useMemo, useState } from "react";
import { LocateFixed, MapPin, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "./LocationCard";
import { WhatsAppButton } from "./WhatsAppButton";
import { business } from "../config/business";
import { findNearestLocation, searchLocations } from "../services/locationService";
import { createWhatsAppLink } from "../utils/whatsapp";

export function LocationSearch() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const [geoBusy, setGeoBusy] = useState(false);

  const results = useMemo(() => searchLocations(query), [query]);
  const emptyQuery = query.trim().length === 0;
  const noMatches = !emptyQuery && results.length === 0;

  function useMyLocation() {
    setGeoMessage(null);

    if (!("geolocation" in navigator)) {
      setGeoMessage("Location isn’t available on this device. Search your area instead.");
      return;
    }

    setGeoBusy(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGeoBusy(false);
        if (!nearest) {
          setGeoMessage("We couldn’t match a Fish Club nearby. Search your location instead.");
          return;
        }
        navigate(`/club/${nearest.id}`);
      },
      (error) => {
        setGeoBusy(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoMessage("Location access wasn’t allowed. Search your location instead.");
          return;
        }
        setGeoMessage("We couldn’t read your location. Search your area instead.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }

  return (
    <div>
      <motion.label
        htmlFor="location-search"
        className="sr-only"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Search your location
      </motion.label>

      {/* Futuristic Search Field */}
      <motion.div
        className="relative"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="pointer-events-none absolute top-1/2 left-5 flex -translate-y-1/2 items-center gap-2 text-aqua">
          <Search className="h-4 w-4 drop-shadow-[0_0_8px_#22D3EE]" />
        </span>
        <input
          id="location-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="🔍 Search your location..."
          autoComplete="off"
          className="console-field min-h-14 w-full rounded-full pl-14 pr-6 text-base text-ice placeholder:text-mist/60 focus:outline-none"
        />
      </motion.div>

      <p className="mt-4 text-center text-[0.68rem] tracking-[0.34em] text-mist/70 uppercase">
        Or
      </p>

      {/* Futuristic "USE MY LOCATION" Action */}
      <motion.button
        type="button"
        onClick={useMyLocation}
        disabled={geoBusy}
        className="mt-3 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full border border-aqua/40 bg-ocean/30 px-5 font-bold tracking-[0.14em] text-ice backdrop-blur-md transition-all hover:border-aqua hover:bg-ocean/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] disabled:opacity-60 uppercase text-xs"
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      >
        <LocateFixed className="h-4 w-4 text-aqua animate-pulse" aria-hidden="true" />
        {geoBusy ? "Scanning nearest club…" : "◎ USE MY LOCATION"}
      </motion.button>

      {geoMessage && (
        <motion.p
          className="mt-3 rounded-2xl border border-aqua/20 bg-deep/80 px-4 py-3 text-sm text-mist text-center backdrop-blur-md"
          role="status"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {geoMessage}
        </motion.p>
      )}

      {noMatches ? (
        <motion.div
          className="card-ocean mt-8 rounded-3xl p-7 text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <MapPin className="mx-auto h-7 w-7 text-aqua drop-shadow-[0_0_12px_#22D3EE]" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-bold text-ice">We haven’t reached your area yet.</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Tell us where you’d like Harbour 2 Home to come next.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              href={createWhatsAppLink(business.whatsappNumber, business.messages.requestNewLocation)}
            >
              Request my location
            </WhatsAppButton>
          </div>
        </motion.div>
      ) : (
        <ul className="mt-6 space-y-3.5">
          {results.map((location, index) => (
            <li key={location.id}>
              <LocationCard location={location} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
