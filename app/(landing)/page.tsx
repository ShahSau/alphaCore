import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import LandingHeader from "@/components/LandingHeader";

const LandingPage = () => {
  return ( 
    <div className="h-full overflow-scroll bg-[#111827] text-white/90">
      
      {/* <LandingNavbar />*/}
      <LandingHeader />
      {/* <div className="mt-24">
      <LandingHero />
      </div> */}
      <LandingHero />
      
    </div>
   );
}
 
export default LandingPage;