import { Link } from "react-router-dom";

const ICON_SRC = "/favicon.svg?v=2";

type BrandLogoProps = {
  compact?: boolean;
  to?: string;
};

export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={ICON_SRC}
      alt=""
      className={`rounded-xl bg-deep object-contain ${className}`}
    />
  );
}

export function BrandLogo({ compact = false, to = "/" }: BrandLogoProps) {
  return (
    <Link to={to} className="inline-flex items-center gap-3 rounded-2xl">
      <BrandMark />
      <span className="text-left leading-tight">
        <span className="block text-[0.78rem] font-bold tracking-[0.18em] text-ice sm:text-[0.86rem]">
          HARBOUR 2 HOME
        </span>
        {!compact && (
          <span className="block text-[0.62rem] font-medium tracking-[0.32em] text-aqua/80 uppercase">
            Fresh on Wheels
          </span>
        )}
      </span>
    </Link>
  );
}
