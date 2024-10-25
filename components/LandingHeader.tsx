import React from 'react'

const LandingHeader = () => {
  return (
    <header className='py-4 border-b border-white/15'>
        <div className='container'>
            <div className='flex justify-between  items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto'>
                <div>
                    <div className='border h-12 w-28 rounded-lg inline-flex justify-start items-center px-4 border-white/15'>
                        <span className='h-8 w-8'>alphaCore</span>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <button className='relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#363636] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]'>
                        <div className='absolute inset-0 '>
                            <div className='rounded-xl border border-black/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]'></div>
                            <div className='rounded-xl border absolute inset-0 border-black/40 [mask-image:linear-gradient(to_top,white,transparent)]'></div>
                            <div className='absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset] rounded-lg'></div>
                        </div>
                        <span className='text-white/60'>Get Started</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default LandingHeader