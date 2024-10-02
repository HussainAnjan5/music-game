
import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { Button } from './ui/moving-border'

const Hero = () => {
  return (
<div>
<div className='h-auto rounded-md md:h-[40rem] flex flex-col overflow-hidden mx-auto py-10 md:py-0 items-center justify-center'>
<div className='p-4 relative z-10 w-full text-center'>
<Spotlight
  className="top-100 left-50 md:left-60 md:-top-20"
  fill="white"
/>
      <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Master the Art of Music</h1>
      <p  className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">Dive into our comprehensive music courses and transform your musical journey today. Wheather you are a beginer or looking to refine your skills , join us to unlock your true potential.</p>
      <div className='mt-4'>
<Link href={'/courses'}><Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Explore's Courses
      </Button></Link>
      </div>
    </div>
</div>
    
</div>
  )
}

export default Hero
