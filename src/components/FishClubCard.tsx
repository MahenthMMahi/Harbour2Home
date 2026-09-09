import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
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
  const [phase, setPhase] = useState<"found" | "club">(reduceMotion ? "club" : "found");
  const hasGroup = Boolean(location.whatsappGroupLink);
  const validGroup = isValidWhatsAppLink(location.whatsappGroupLink);
  const testLink = isDevelopmentTestLink(location.whatsappGroupLink);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("club");
      return;
    }
    setPhase("found");
    const timer = window.setTimeout(() => setPhase("club"), 900);
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
    <div className="relative min-h-[70dvh]">
      <AnimatePresence mode="wait">
        {phase === "found" ? (
          <motion.div
            key="found"
            className="flex min-h-[60dvh] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[0.72rem] tracking-[0.38em] text-aqua uppercase">Location found</p>
            <span className="mt-6 h-px w-24 bg-aqua/50" />
            <p className="mt-6 text-xs tracking-[0.28em] text-mist">📍</p>
            <p className="mt-2 text-4xl font-bold tracking-[0.16em] text-ice uppercase">{location.name}</p>
          </motion.div>
        ) : (
          <motion.article
            key="club"
            className="card-ocean-active rounded-[1.75rem] px-6 py-8 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <p className="text-[0.68rem] tracking-[0.34em] text-aqua uppercase">Location confirmed</p>
            <span className="mx-auto mt-5 block h-px w-20 bg-aqua/40" />
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-mist">
              <MapPin className="h-4 w-4 text-aqua" aria-hidden="true" />
              {location.name}
              <span className="text-mist/70">· {location.nameMalayalam}</span>
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-bold tracking-[0.08em] text-ice uppercase">
              {location.displayName}
            </h1>
            <p className="mt-3 text-sm text-mist">
              {hasGroup && validGroup
                ? "Your local Harbour 2 Home community."
                : "Your Fish Club is coming soon."}
            </p>
            <ul className="mt-6 space-y-1 text-sm text-glow/90">
              <li>Fresh catch updates</li>
              <li>Local arrival times</li>
              <li>Special offers</li>
            </ul>

            {testLink && (
              <p className="mt-4 rounded-2xl bg-deep px-3 py-2 text-xs text-mist">
                Development test invite — replace with a real WhatsApp group link before going live.
              </p>
            )}

            <div className="mt-8 space-y-3">
              {hasGroup && validGroup ? (
                <motion.button
                  type="button"
                  onClick={joinGroup}
                  className="portal-glow inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-deep px-5 text-base font-bold tracking-[0.08em] text-ice"
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                  Join Fish Club on WhatsApp
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
                <p className="text-sm text-glow" role="alert">
                  {linkError}
                </p>
              )}

              <Link
                to="/location"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 font-semibold tracking-[0.1em] text-mist ring-1 ring-aqua/20"
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
