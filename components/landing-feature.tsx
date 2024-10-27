'use client'

import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import { DotLottieCommonPlayer, DotLottiePlayer } from '@dotlottie/react-player'
import productImage from '@/app/assets/product-image.png'
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from 'framer-motion'

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

const FeatureTab = (props:(typeof tabs)[number] & ComponentPropsWithoutRef<'div'> & {selected:boolean})=>{
    const dotLottieRef = useRef<DotLottieCommonPlayer>(null)
    const tabRef = useRef<HTMLDivElement>(null)

    const xParcentage = useMotionValue(0)
    const yParcentage = useMotionValue(0)

    const maskImage =useMotionTemplate`radial-gradient(80px 80px at ${xParcentage}% ${yParcentage}%,black,transparent)`

    
    useEffect(()=>{
        if(!tabRef.current || !props.selected) return
        xParcentage.set(0)
        yParcentage.set(0)
        const {width,height} = tabRef.current.getBoundingClientRect()
        const circumference = height * 2 + width * 2
        const times = [0, width/circumference, (width+height)/circumference, (width*2+height)/circumference, 1]

        const options:ValueAnimationTransition={
            times,
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
        }

        animate(xParcentage,[0, 100, 100, 0, 0],options)
        animate(yParcentage,[0, 0, 100, 100, 0],options)
    },[props.selected])
    
    const handleTabHover = () => {
        if(dotLottieRef.current == null) return 
        dotLottieRef.current.seek(0)
        dotLottieRef.current?.play()
    }
    return(
    <div 
        ref={tabRef}
        onMouseEnter={handleTabHover}
        className='border border-white/10 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative'
        onClick={props.onClick}
    >
        {props.selected && (
            <motion.div 
            className='absolute inset-0 -m-px rounded-xl border border-[#A369FF]'
            style={{
                maskImage
            }}
        ></motion.div>
        )}
        <div className='h-12 w-12 border border-white/10 rounded-lg inline-flex items-center justify-center'>
            <DotLottiePlayer 
                src={props.icon} 
                className='h-5 w-5' 
                autoplay
                ref={dotLottieRef}
            />
        </div>
        <div className='font-medium'>{props.title}</div>
        {props.isNew && <div className='text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold'>New</div>}
    </div>
    )
}

const Landingfeature = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`
    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`

    const handleSelectTab = (index:number) => {
        setSelectedTab(index);
        const animateOptions:ValueAnimationTransition={
            duration: 2,
            ease: 'easeInOut'
        }
        
        
        animate(backgroundSizeX,[backgroundSizeX.get(),100, tabs[index].backgroundSizeX],animateOptions)

        animate(backgroundPositionX,[backgroundPositionX.get(), tabs[index].backgroundPositionX],animateOptions)

        animate(backgroundPositionY,[backgroundPositionY.get(), tabs[index].backgroundPositionY],animateOptions)
    }
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
                    <FeatureTab 
                        key={index} 
                        {...tab} 
                        onClick={()=>handleSelectTab(index)} 
                        selected={selectedTab === index}
                    />
                ))}
            </div>
            <div className='border border-white/30 p-2.5 rounded-xl mt-3'>
                <motion.div className='aspect-video bg-cover border-white/30 rounded-lg' style={{
                    backgroundImage: `url(${productImage.src})`,
                    backgroundPosition,
                    backgroundSize,
                }}></motion.div>
            </div>

        </div>

    </section>
  )
}

export default Landingfeature