import { BrandLogo } from "./BrandLogo";
import { business } from "../config/business";
import { createWhatsAppLink } from "../utils/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-aqua/10 bg-abyss px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BrandLogo compact />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">{business.shortPitch}</p>
        </div>
        <a
          href={createWhatsAppLink(business.whatsappNumber, business.messages.availability)}
          className="text-sm font-medium text-aqua hover:text-ice"
        >
          Chat with Harbour 2 Home
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs text-mist/50">
        © {year} {business.name}. Freshness on wheels.
      </p>
    </footer>
  );
}
