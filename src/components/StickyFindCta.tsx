import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type StickyFindCtaProps = {
  visible: boolean;
  to: string;
  label?: string;
};

export function StickyFindCta({ visible, to, label = "FIND MY FISH CLUB" }: StickyFindCtaProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          <Link
            to={to}
            className="pointer-events-auto portal-glow flex min-h-12 items-center justify-center gap-2 rounded-full bg-deep/95 px-4 text-sm font-bold tracking-[0.14em] text-ice"
          >
            <span className="h-2 w-2 rounded-full bg-aqua shadow-[0_0_10px_#22D3EE]" aria-hidden="true" />
            {label}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
