import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { business } from "../config/business";
import { createWhatsAppLink } from "../utils/whatsapp";

export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  return (
    <a
      href={createWhatsAppLink(business.whatsappNumber, business.messages.availability)}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-deep px-3 text-sm font-semibold text-ice ring-1 ring-aqua/30 shadow-[0_0_24px_rgba(34,211,238,0.2)] sm:right-6"
      aria-label="Chat with Harbour 2 Home on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
      <span className="hidden pr-1 min-[420px]:inline">Chat</span>
    </a>
  );
}
