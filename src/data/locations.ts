import type { Location } from "../types/location";

/**
 * Harbour 2 Home Fish Club locations
 * ----------------------------------
 * This is the only file you need to edit to add or change routes.
 *
 * HOW TO ADD A LOCATION
 * 1. Copy an existing object below.
 * 2. Give it a unique `id` in kebab-case (used in URLs: /?location=your-id).
 * 3. Fill in English name, Malayalam name, display name, keywords, and coordinates.
 * 4. Set `whatsappGroupLink` to a real https://chat.whatsapp.com/... invite, or null.
 *
 * HOW TO ADD / CHANGE A WHATSAPP GROUP LINK
 * - Production: paste the official invite URL from WhatsApp.
 * - Leave as `null` until the group exists (the site will show “coming soon”).
 * - Never put fake invite links in production builds.
 *
 * HOW TO DISABLE A LOCATION
 * - Set `active: false`. It will disappear from search and QR preloads.
 *
 * HOW TO ADD A MALAYALAM NAME
 * - Set `nameMalayalam` and include the same text in `keywords` so search works.
 *
 * HOW TO ADD COORDINATES
 * - Use the area’s approximate centre (latitude, longitude).
 * - Used only in the browser for “Use my location” (Haversine). Never sent to a server.
 *
 * QR STICKERS
 * - General vehicle: https://yourdomain.com/
 * - Route-specific: https://yourdomain.com/?location=vithura
 */
function productionGroupLink(envValue: string | undefined): string | null {
  const value = envValue?.trim();
  if (value && value.startsWith("https://")) return value;
  return null;
}

function vithuraGroupLink(): string | null {
  const production = productionGroupLink(import.meta.env.VITE_WA_GROUP_VITHURA);
  if (production) return production;

  // Development-only placeholder so the join flow can be tested locally.
  // It is never shipped in production builds.
  if (import.meta.env.DEV) {
    return "https://chat.whatsapp.com/TEST_DEV_ONLY_VITHURA";
  }

  return null;
}

export const locations: Location[] = [
  {
    id: "vithura",
    name: "Vithura",
    nameMalayalam: "വിതുര",
    displayName: "Fish Club Vithura",
    keywords: ["vithura", "വിതുര", "vithura fish", "fish club vithura"],
    whatsappGroupLink: vithuraGroupLink(),
    active: true,
    latitude: 8.6756,
    longitude: 77.0853,
  },
  {
    id: "nedumangad",
    name: "Nedumangad",
    nameMalayalam: "നെടുമങ്ങാട്",
    displayName: "Fish Club Nedumangad",
    keywords: ["nedumangad", "നെടുമങ്ങാട്", "nedumangadu"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.6034,
    longitude: 77.0028,
  },
  {
    id: "palode",
    name: "Palode",
    nameMalayalam: "പാലോട്",
    displayName: "Fish Club Palode",
    keywords: ["palode", "പാലോട്"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.7162,
    longitude: 77.0264,
  },
  {
    id: "aryanad",
    name: "Aryanad",
    nameMalayalam: "ആര്യനാട്",
    displayName: "Fish Club Aryanad",
    keywords: ["aryanad", "ആര്യനാട്", "aryanadu"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.5831,
    longitude: 77.0832,
  },
  {
    id: "venjaramoodu",
    name: "Venjaramoodu",
    nameMalayalam: "വെഞ്ഞാറമൂട്",
    displayName: "Fish Club Venjaramoodu",
    keywords: ["venjaramoodu", "വെഞ്ഞാറമൂട്", "venjaramood"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.6789,
    longitude: 76.9118,
  },
  {
    id: "pothencode",
    name: "Pothencode",
    nameMalayalam: "പോത്തൻകോട്",
    displayName: "Fish Club Pothencode",
    keywords: ["pothencode", "പോത്തൻകോട്", "pothencode"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.6128,
    longitude: 76.8969,
  },
  {
    id: "kilimanoor",
    name: "Kilimanoor",
    nameMalayalam: "കിളിമാനൂർ",
    displayName: "Fish Club Kilimanoor",
    keywords: ["kilimanoor", "കിളിമാനൂർ"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.7679,
    longitude: 76.8797,
  },
  {
    id: "peroorkada",
    name: "Peroorkada",
    nameMalayalam: "പേരൂർക്കട",
    displayName: "Fish Club Peroorkada",
    keywords: ["peroorkada", "പേരൂർക്കട", "peroorkada"],
    whatsappGroupLink: null,
    active: true,
    latitude: 8.5384,
    longitude: 76.9661,
  },
];
