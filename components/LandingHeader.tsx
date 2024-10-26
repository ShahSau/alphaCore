"use client";

import React from 'react'
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';
import LandingButton from './landing-Button';

const LandingHeader = () => {
    const { isSignedIn } = useAuth();
  return (
    <header className='py-4 border-b border-white/15 md:border-none sticky top-0 z-10'>
        <div className='container'>
            <div className='flex justify-between  items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur'>
                <div>
                    <div className='border h-12 w-28 rounded-lg inline-flex justify-start items-center px-4 border-white/15'>
                        <span className='h-8 w-8'>alphaCore</span>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                        <LandingButton text='Get Started'/>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default LandingHeader