import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "../config/business";
import { createWhatsAppLink } from "../utils/whatsapp";

type WhatsAppButtonProps = {
  href?: string;
  children: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  fullWidth?: boolean;
};

export function WhatsAppButton({
  href,
  children,
  variant = "primary",
  fullWidth = true,
}: WhatsAppButtonProps) {
  const reduceMotion = useReducedMotion();
  const destination =
    href ?? createWhatsAppLink(business.whatsappNumber, business.messages.hello);

  const styles = {
    primary:
      "bg-deep text-ice portal-glow hover:bg-ocean/80",
    secondary: "bg-deep/70 text-ice ring-1 ring-aqua/25 hover:bg-ocean/50",
    ghost: "bg-transparent text-aqua hover:bg-deep/60 ring-1 ring-aqua/25",
    outline: "bg-transparent text-ice ring-1 ring-aqua/25 hover:bg-deep/80",
  };

  return (
    <motion.a
      href={destination}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-semibold tracking-[0.08em] ${styles[variant]} ${fullWidth ? "w-full" : ""}`}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
      </span>
      {children}
    </motion.a>
  );
}
