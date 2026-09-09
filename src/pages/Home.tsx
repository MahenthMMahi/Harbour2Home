import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Hero } from "../components/Hero";
import { StickyFindCta } from "../components/StickyFindCta";
import { getLocationById } from "../services/locationService";

const steps = [
  { n: "01", title: "Scan", copy: "Scan the QR on our vehicle." },
  { n: "02", title: "Find", copy: "Choose your local Fish Club." },
  { n: "03", title: "Join", copy: "Join the community on WhatsApp." },
  { n: "04", title: "Stay close", copy: "Today’s catch. Tomorrow’s update." },
];

export function Home() {
  const [params] = useSearchParams();
  const preloaded = getLocationById(params.get("location"));
  const unknownQr = Boolean(params.get("location") && !preloaded);
  const [ctaNode, setCtaNode] = useState<HTMLDivElement | null>(null);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);

  useEffect(() => {
    if (!ctaNode) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(ctaNode);
    return () => observer.disconnect();
  }, [ctaNode]);

  return (
    <div>
      <Hero preloaded={preloaded} onCtaNode={setCtaNode} />
      {unknownQr && (
        <p className="mx-auto -mt-4 mb-6 max-w-2xl px-4 text-center text-sm text-mist">
          That QR route isn’t on our list yet.{" "}
          <Link to="/location" className="text-aqua underline-offset-4 hover:underline">
            Find your Fish Club
          </Link>
          .
        </p>
      )}
      <section className="relative px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] tracking-[0.32em] text-aqua uppercase">Your local Fish Club</p>
          <h2 className="mt-3 text-3xl font-bold text-ice">Join your local fish community.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-mist">
            Fresh catch updates. Arrival times. Special offers. Closer to your home.
          </p>
        </div>
      </section>
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-ice">From the road to the sea.</h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {steps.map((step) => (
              <li key={step.n} className="card-ocean rounded-3xl px-5 py-5">
                <p className="text-xs tracking-[0.28em] text-aqua">{step.n}</p>
                <h3 className="mt-2 text-xl font-semibold text-ice">{step.title}</h3>
                <p className="mt-1 text-sm text-mist">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <StickyFindCta visible={!heroCtaVisible} to={preloaded ? `/club/${preloaded.id}` : "/location"} />
    </div>
  );
}
