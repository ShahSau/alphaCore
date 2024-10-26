import React from 'react'
import LandingButton from './landing-Button'

const LandingcallToAction = () => {
  return (
    <section className='py-20 md:py-24'>
        <div className='container'>
            <div className='border border-white/20 py-24 rounded-xl overflow-hidden relative' style={{
                backgroundImage: "url('/stars.png')",
            }}>
                <div className='absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]' style={{
                    backgroundImage: "url('/grid-lines.png')",
                }}></div>
                <div className='relative'>
                    <h2 className='text-5xl md:text-6xl tracking-tighter text-center font-medium max-w-sm mx-auto'>Ready to get started?</h2>
                    <p className='text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight'>Start your free trial today. No credit card required.</p>
                    <div className='flex justify-center mt-8'>
                    <LandingButton text='Start free trial' />
                    </div>
                </div>
                

            </div>
        </div>
    </section>
  )
}

export default LandingcallToAction