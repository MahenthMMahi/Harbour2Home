import { business } from "../config/business";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { OceanBackground } from "../components/OceanBackground";
import { createWhatsAppLink } from "../utils/whatsapp";

export function Contact() {
  return (
    <section className="relative min-h-dvh overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      <OceanBackground />
      <div className="relative mx-auto max-w-xl">
        <div className="card-ocean rounded-3xl p-6 text-center">
          <p className="text-xs tracking-[0.28em] text-aqua uppercase">{business.name}</p>
          <h1 className="mt-2 text-4xl font-bold text-ice">{business.tagline}</h1>
          <p className="mt-4 text-base leading-relaxed text-mist">{business.shortPitch}</p>
          <p className="mt-6 text-sm text-mist">WhatsApp</p>
          <p className="text-xl font-semibold text-ice">{business.whatsappDisplay}</p>
          <div className="mt-6">
            <WhatsAppButton href={createWhatsAppLink(business.whatsappNumber, business.messages.availability)}>
              Chat with Harbour 2 Home
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
