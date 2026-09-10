import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Location } from "../types/location";
import { WhatsAppButton } from "./WhatsAppButton";
import { business } from "../config/business";
import { createWhatsAppLink, isDevelopmentTestLink, isValidWhatsAppLink } from "../utils/whatsapp";

type FishClubCardProps = {
  location: Location;
};

export function FishClubCard({ location }: FishClubCardProps) {
  const reduceMotion = useReducedMotion();
  const [linkError, setLinkError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"revealing" | "confirmed">(
    reduceMotion ? "confirmed" : "revealing"
  );
  const hasGroup = Boolean(location.whatsappGroupLink);
  const validGroup = isValidWhatsAppLink(location.whatsappGroupLink);
  const testLink = isDevelopmentTestLink(location.whatsappGroupLink);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("confirmed");
      return;
    }
    setPhase("revealing");
    const timer = window.setTimeout(() => setPhase("confirmed"), 850);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, location.id]);

  function joinGroup() {
    setLinkError(null);
    const url = location.whatsappGroupLink;
    if (!isValidWhatsAppLink(url) || !url) {
      setLinkError("This Fish Club invite isn’t ready yet. Chat with us and we’ll add you.");
      return;
    }
    window.location.href = url;
  }

  return (
    <div className="relative min-h-[70dvh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === "revealing" ? (
          <motion.div
            key="revealing"
            className="flex min-h-[50dvh] flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[0.7rem] font-bold tracking-[0.42em] text-aqua uppercase">
              Location Found
            </span>
            <motion.span
              className="mt-6 h-px w-28 bg-gradient-to-r from-transparent via-aqua to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 112 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="mt-6 text-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              📍
            </motion.div>
            <motion.p
              className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-[0.16em] text-ice uppercase drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {location.name}
            </motion.p>
          </motion.div>
        ) : (
          <motion.article
            key="confirmed"
            className="card-ocean-active w-full max-w-lg rounded-[2rem] p-7 sm:p-9 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step 1: LOCATION CONFIRMED */}
            <p className="text-[0.68rem] font-bold tracking-[0.38em] text-aqua uppercase">
              Location Confirmed
            </p>

            {/* Glowing separator line */}
            <span className="mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-transparent via-aqua/60 to-transparent" />

            {/* Step 2: 📍 VITHURA */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-ocean/30 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-aqua">
              <MapPin className="h-3.5 w-3.5 text-glow" aria-hidden="true" />
              <span>{location.name.toUpperCase()}</span>
              <span className="text-mist/70">· {location.nameMalayalam}</span>
            </div>

            {/* Step 3: FISH CLUB VITHURA */}
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight tracking-[0.06em] text-ice uppercase">
              {location.displayName}
            </h1>

            {/* Step 4: "Your local Harbour 2 Home community." */}
            <p className="mt-3 text-sm sm:text-base font-normal text-mist">
              {hasGroup && validGroup
                ? "Your local Harbour 2 Home community."
                : "Your Fish Club is coming soon."}
            </p>

            {/* Value bullets */}
            <div className="mt-6 rounded-2xl border border-aqua/15 bg-deep/50 p-4 text-xs tracking-wider text-glow/90 space-y-1.5">
              <p>✦ Fresh catch updates directly from harbour</p>
              <p>✦ Exact arrival times & route alerts</p>
              <p>✦ Exclusive local member offers</p>
            </div>

            {testLink && (
              <p className="mt-4 rounded-xl border border-aqua/20 bg-deep px-3 py-2 text-xs text-mist/80">
                Development test invite — replace with a real WhatsApp group link before going live.
              </p>
            )}

            {/* Step 5: [ JOIN FISH CLUB ON WHATSAPP ] */}
            <div className="mt-8 space-y-3">
              {hasGroup && validGroup ? (
                <motion.button
                  type="button"
                  onClick={joinGroup}
                  className="portal-surface portal-glow-strong group relative flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-6 text-base font-bold tracking-[0.08em] text-ice transition-all"
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366] fill-[#25D366]/20" aria-hidden="true" />
                  <span>JOIN FISH CLUB ON WHATSAPP</span>
                </motion.button>
              ) : (
                <WhatsAppButton
                  href={createWhatsAppLink(
                    business.whatsappNumber,
                    business.messages.requestClub(location.name),
                  )}
                >
                  Request this Fish Club
                </WhatsAppButton>
              )}

              {linkError && (
                <p className="text-xs text-glow" role="alert">
                  {linkError}
                </p>
              )}

              <Link
                to="/location"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-xs font-semibold tracking-[0.14em] text-mist ring-1 ring-aqua/20 transition-colors hover:text-ice hover:ring-aqua/40 uppercase"
              >
                Change location
              </Link>

              <WhatsAppButton
                href={createWhatsAppLink(business.whatsappNumber, business.messages.availability)}
                variant="ghost"
              >
                Chat with Harbour 2 Home
              </WhatsAppButton>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
