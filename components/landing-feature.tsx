'use client'

import React from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import Image from 'next/image'
import productImage from '@/app/assets/product-image.png'
const tabs=[
    {
        icon:'/assets/lottie/vroom.lottie',
        title: 'User-friendly dashboard',
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
    },
    {
        icon:'/assets/lottie/click.lottie',
        title: 'One click optimization',
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
    },
    {
        icon:'/assets/lottie/stars.lottie',
        title: 'Smart keyword suggestions',
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
    }
]

const Landingfeature = () => {
  return (
    <section className='py-20 md:py-24'>
        <div className='container'>
            <h2 className='text-5xl md:text-6xl font-medium text-center tracking-tighter'>Build with AI</h2>
            <p className='text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5'>
                Unleash the power of ai to revolutionize industries, accelerate scientific discovery, and tackle society's greatest challenges.
            </p>
            {/* Tabs */}
            <div className='mt-10 flex flex-col lg:flex-row gap-3'>
                {tabs.map((tab, index) => (
                    <div key={index} className='border border-white/10 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1'>
                        <div className='h-12 w-12 border border-white/10 rounded-lg inline-flex items-center justify-center'>
                            <DotLottiePlayer 
                                src={tab.icon} 
                                className='h-5 w-5' 
                                autoplay
                            />
                        </div>
                        <div className='font-medium'>{tab.title}</div>
                        {tab.isNew && <div className='text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold'>New</div>}
                    </div>
                ))}
            </div>
            <div className='border border-white/30 p-2.5 rounded-xl mt-3'>
                <div className='aspect-video bg-cover border-white/30 rounded-lg' style={{
                    backgroundImage: `url(${productImage.src})`,
                }}></div>
            </div>

        </div>

    </section>
  )
}

export default Landingfeature