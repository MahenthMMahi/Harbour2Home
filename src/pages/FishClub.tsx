import { Link, useParams } from "react-router-dom";
import { FishClubCard } from "../components/FishClubCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { OceanBackground } from "../components/OceanBackground";
import { business } from "../config/business";
import { getLocationById } from "../services/locationService";
import { createWhatsAppLink } from "../utils/whatsapp";

export function FishClub() {
  const { id } = useParams();
  const location = getLocationById(id);

  if (!location) {
    return (
      <section className="relative min-h-dvh overflow-hidden px-4 pt-24 pb-16 sm:px-6">
        <OceanBackground />
        <div className="relative mx-auto max-w-xl">
          <div className="card-ocean rounded-3xl p-6 text-center">
            <h1 className="text-3xl font-bold text-ice">We haven’t reached that area yet.</h1>
            <p className="mt-3 text-mist">
              Tell us where you’d like Harbour 2 Home to come next, or pick a nearby Fish Club.
            </p>
            <div className="mt-6 space-y-3">
              <WhatsAppButton
                href={createWhatsAppLink(business.whatsappNumber, business.messages.requestNewLocation)}
              >
                Request my location
              </WhatsAppButton>
              <Link
                to="/location"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full font-semibold text-mist ring-1 ring-aqua/20"
              >
                Browse Fish Clubs
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-dvh overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      <OceanBackground />
      <div className="relative mx-auto max-w-xl">
        <FishClubCard location={location} />
      </div>
    </section>
  );
}
