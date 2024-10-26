import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import LandingHeader from "@/components/LandingHeader";
import Landinglogoticker from "@/components/landing-logoticker";
import Landingfeature from "@/components/landing-feature";

const LandingPage = () => {
  return ( 
    <div className="h-full overflow-x-hidden bg-[#111827] text-white/90">
      
      {/* <LandingNavbar />*/}
      <LandingHeader />
      {/* <div className="mt-24">
      <LandingHero />
      </div> */}
      <LandingHero />
      <Landinglogoticker />
      <Landingfeature />
      
    </div>
   );
}
 
export default LandingPage;