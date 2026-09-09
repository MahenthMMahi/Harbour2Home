import { useMemo, useState } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
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
      <motion.div
        className="relative"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2 text-aqua">
          <span className={`h-2 w-2 rounded-full bg-aqua shadow-[0_0_10px_#22D3EE] ${reduceMotion ? "" : "orb-pulse"}`} />
          <Search className="h-4 w-4" />
        </span>
        <input
          id="location-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your location..."
          autoComplete="off"
          className="console-field min-h-14 w-full rounded-full px-14 text-ice placeholder:text-mist/50"
        />
      </motion.div>

      <p className="mt-5 text-center text-[0.7rem] tracking-[0.34em] text-mist uppercase">Or</p>

      <button
        type="button"
        onClick={useMyLocation}
        disabled={geoBusy}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ocean/40 px-4 font-semibold tracking-[0.12em] text-ice ring-1 ring-aqua/35 disabled:opacity-70"
      >
        <Navigation className="h-5 w-5 text-aqua" aria-hidden="true" />
        {geoBusy ? "Finding nearest club…" : "Use my location"}
      </button>

      {geoMessage && (
        <p className="mt-3 rounded-2xl bg-deep/70 px-4 py-3 text-sm text-mist" role="status">
          {geoMessage}
        </p>
      )}

      {noMatches ? (
        <div className="card-ocean mt-8 rounded-3xl px-5 py-8 text-center">
          <MapPin className="mx-auto h-6 w-6 text-aqua" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-bold text-ice">We haven’t reached your area yet.</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Tell us where you’d like Harbour 2 Home to come next.
          </p>
          <div className="mt-6">
            <WhatsAppButton href={createWhatsAppLink(business.whatsappNumber, business.messages.requestNewLocation)}>
              Request my location
            </WhatsAppButton>
          </div>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
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
