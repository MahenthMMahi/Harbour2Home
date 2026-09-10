import { HeroSection } from "./HeroSection";
import type { Location } from "../types/location";

type HeroProps = {
  preloaded?: Location | null;
  onCtaNode?: (node: HTMLDivElement | null) => void;
};

export function Hero({ preloaded, onCtaNode }: HeroProps) {
  return <HeroSection preloaded={preloaded} onCtaNode={onCtaNode} />;
}
