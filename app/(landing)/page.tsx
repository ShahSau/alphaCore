import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import LandingHeader from "@/components/LandingHeader";
import Landinglogoticker from "@/components/landing-logoticker";
import Landingfeature from "@/components/landing-feature";
import Landingtestimonial from "@/components/landing-testimonial";
import LandingcallToAction from "@/components/landing-callToAction";

const LandingPage = () => {
  return (
    <div className="h-full overflow-x-hidden bg-[#111827] text-white/90">
      <LandingHeader />
      <LandingHero />
      <Landinglogoticker />
      <Landingfeature />
      <Landingtestimonial />
      <LandingcallToAction />
    </div>
  );
};

export default LandingPage;
