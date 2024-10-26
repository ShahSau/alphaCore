"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LandingButton from "./landing-Button";
import starsBg from "@/app/assets/stars.png"
import { useRef } from "react";

export const LandingHero = () => {
  const sectionRef = useRef(null);
  const {scrollYProgress} =useScroll({
    target: sectionRef,
    offset:['start end', 'end start'],
  })

  const backgroundPositionY= useTransform(scrollYProgress, [0, 1], [-300, 300]);
  return (
  <motion.section 
    ref={sectionRef}
    className="h-[550px] md:h-[800px] mt-12 md:mt-24 flex items-center justify-center relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" 
    style={{
      backgroundImage: `url(${starsBg.src})`,
      backgroundPositionY,
    }}
    animate={{
      backgroundPositionX: starsBg.width,
    }}
    transition={{
      duration: 90,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(142,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>
    {/*circle */}
    <div className="absolute h-64 w-64 md:h-80 md:w-80 bg-purple-500 rounded-full border border-white/20 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
    {/*first ring */}
    <motion.div 
      className="absolute h-[344px] w-[344px] md:h-[540px] md:w-[540px] lg:h-[580px] lg:w-[580px] opacity-20 border rounded-full top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        translateY: '-50%',
        translateX: '-50%',
      }}
      animate={{
        rotate: '1turn',
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: 'linear',
      }}
      >
      <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-5 w-5 left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
        <div className="h-2 w-2 bg-white rounded-full"></div>
      </div>
    </motion.div>
    {/*second ring */}
    <motion.div 
      className="absolute h-[444px] w-[444px] md:h-[620px] md:w-[620px] lg:h-[780px] lg:w-[780px] rounded-full border border-dashed border-white/20 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{
        rotate: '-1turn',
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        translateY: '-50%',
        translateX: '-50%',
      }}
      ></motion.div>
    {/*third ring */}
    <motion.div 
      className="absolute h-[544px] w-[544px] md:h-[700px] md:w-[700px] lg:h-[980px] lg:w-[980px] rounded-full border opacity-20 border-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{
        rotate: '1turn',
      }}
      transition={{
        duration: 90,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        translateY: '-50%',
        translateX: '-50%',
      }}
      >
      <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </motion.div>

    <div className="container relative -mt-24 md:-mt-32">
      <h1 className="text-[60px] md:text-[148px] md:leading-none font-semibold tracking-tighter bg-white  bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center">AlphaCore</h1>
      <p className="text-lg md:text-xl text-white/70 mt-5 text-center max-w-xl mx-auto">Unleash the power of ai to enhance everyday life in ways we have never imagined.</p>
      <div className="flex justify-center mt-5">
        <LandingButton text="Get Started" />
      </div>
      

    </div>
    
  </motion.section>
  );
};