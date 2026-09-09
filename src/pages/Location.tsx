import { LocationSearch } from "../components/LocationSearch";
import { OceanBackground } from "../components/OceanBackground";

export function Location() {
  return (
    <section className="relative min-h-dvh overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      <OceanBackground />
      <div className="relative mx-auto max-w-xl">
        <p className="text-center text-[0.7rem] tracking-[0.34em] text-aqua uppercase">Navigation</p>
        <h1 className="mt-3 text-center text-4xl font-bold tracking-[-0.03em] text-ice">Where are you?</h1>
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
