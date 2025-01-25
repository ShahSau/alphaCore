import { LandingHero } from "@/components/landing/landing-hero";
import LandingHeader from "@/components/landing/LandingHeader"
import Landinglogoticker from "@/components/landing/landing-logoticker";
import Landingfeature from "@/components/landing/landing-feature";
import Landingtestimonial from "@/components/landing/landing-testimonial";
import LandingcallToAction from "@/components/landing/landing-callToAction";

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
