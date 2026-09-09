import { Link } from "react-router-dom";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { OceanBackground } from "../components/OceanBackground";
import { business } from "../config/business";
import { createWhatsAppLink } from "../utils/whatsapp";

export function NotFound() {
  return (
    <section className="relative min-h-dvh overflow-hidden px-4 pt-28 pb-16 text-center">
      <OceanBackground />
      <div className="relative mx-auto max-w-xl">
        <h1 className="text-4xl font-bold text-ice">This page has drifted offshore.</h1>
        <p className="mt-3 text-mist">Let’s get you back to your local Fish Club.</p>
        <div className="mx-auto mt-8 max-w-sm space-y-3">
          <Link
            to="/"
            className="portal-glow inline-flex min-h-12 w-full items-center justify-center rounded-full bg-deep font-semibold text-ice"
          >
            Go home
          </Link>
          <WhatsAppButton href={createWhatsAppLink(business.whatsappNumber, business.messages.hello)} variant="ghost">
            Chat with Harbour 2 Home
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
