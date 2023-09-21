"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import ai from "../app/assets/ai.png"
import Image from 'next/image'
export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
  <div className="relative">
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
      </svg>
      <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
            Let&apos;s Build Something amazing with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unleash the power of ai to revolutionize industries, accelerate scientific discovery, and enhance everyday 
            life in ways we have never imagined.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                Start Using For Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <Image src={ai} alt="ai pic" className="aspect-[3/2] w-full  object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"/>
      </div>
    </div>
  </div>
  );
};