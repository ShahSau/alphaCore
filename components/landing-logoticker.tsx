import React from 'react'
import acmeLogo from '../app/assets/logo-acme.png'
import apexLogo from '../app/assets/logo-apex.png'
import celestialLogo from '../app/assets/logo-celestial.png'
import quantumLogo from '../app/assets/logo-quantum.png'
import pulseLogo from '../app/assets/logo-pulse.png'
import echoLogo from '../app/assets/logo-echo.png'
import Image from 'next/image'
const Landinglogoticker = () => {
  return (
    <section className='py-20 md:py-24'>
        <div className='container'>
            <div className='flex items-center gap-5'>
                <div className='flex-1 md:flex-none'>
                    <h2>Trusted by top innovative teams</h2>
                </div>
                <div className='flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]'>
                    <div className='flex flex-none gap-14'>
                        {[acmeLogo, apexLogo, celestialLogo, quantumLogo, pulseLogo, echoLogo].map((logo, index) => (
                            <Image 
                                key={index} 
                                src={logo} alt='logo' 
                                height={24}
                                className='w-auto'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Landinglogoticker