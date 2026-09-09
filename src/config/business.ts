export const business = {
  name: "Harbour 2 Home",
  tagline: "Fresh on Wheels",
  shortPitch: "Fresh fish from the harbour, brought closer to your home.",
  whatsappNumber: "919961912442",
  whatsappDisplay: "+91 99619 12442",
  messages: {
    availability:
      "Hi Harbour 2 Home 👋 I would like to know today's fresh fish availability.",
    hello: "Hi Harbour 2 Home 👋",
    requestClub: (place: string) =>
      `Hi Harbour 2 Home, I would like a Fish Club WhatsApp group for ${place}.`,
    requestNewLocation:
      "Hi Harbour 2 Home, please add my location to your Fish Club network.",
  },
} as const;
