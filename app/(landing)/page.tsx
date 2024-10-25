import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import LandingHeader from "@/components/LandingHeader";

const LandingPage = () => {
  return ( 
    <div className="h-full bg-slate-100">
      <LandingHeader />
      <LandingNavbar />
      <LandingHero />
    </div>
   );
}
 
export default LandingPage;