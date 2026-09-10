import { Link, NavLink } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-[#01111A]/90 via-[#01111A]/60 to-transparent backdrop-blur-[6px] transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <BrandLogo compact />
        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Primary">
          <NavLink
            to="/location"
            className={({ isActive }) =>
              `text-[0.72rem] font-bold tracking-[0.18em] uppercase sm:text-xs transition-colors ${
                isActive ? "text-aqua drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-mist hover:text-ice"
              }`
            }
          >
            Find Fish Club
          </NavLink>
          <Link
            to="/contact"
            className="hidden text-[0.72rem] font-medium tracking-[0.16em] text-mist uppercase hover:text-ice transition-colors sm:inline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
