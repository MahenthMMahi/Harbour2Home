import { LocationSearch } from "../components/LocationSearch";
import { OceanBackground } from "../components/OceanBackground";

export function Location() {
  return (
    <section className="relative min-h-dvh overflow-hidden px-4 pt-24 pb-20 sm:px-6">
      {/* Cinematic Ocean Ambiance */}
      <OceanBackground includeVideo={false} />

      <div className="relative mx-auto max-w-xl">
        <p className="text-center text-[0.7rem] font-bold tracking-[0.38em] text-aqua uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
          Marine Navigation
        </p>
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-[-0.03em] text-ice uppercase sm:text-5xl">
          Where Are You?
        </h1>
        <p className="mt-3 text-center text-base leading-relaxed text-mist">
          Find the Fish Club closest to you.
        </p>
        <div className="mt-8">
          <LocationSearch />
        </div>
      </div>
    </section>
  );
}
