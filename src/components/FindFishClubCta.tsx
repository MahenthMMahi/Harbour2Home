import { type Ref } from "react";
import { CinematicCTA } from "./CinematicCTA";

type FindFishClubCtaProps = {
  to?: string;
  label?: string;
  sublabel?: string;
  onVisibleRef?: Ref<HTMLDivElement>;
};

export function FindFishClubCta({
  to = "/location",
  label = "FIND MY",
  sublabel = "FISH CLUB",
  onVisibleRef,
}: FindFishClubCtaProps) {
  return (
    <CinematicCTA
      to={to}
      label={label}
      sublabel={sublabel}
      onVisibleRef={onVisibleRef}
    />
  );
}
