import React, { useState } from 'react'
import Button from './Button'
import Image from 'next/image'

function Landing() {
  const [loading, setLoading] = useState(false)

  function onClick() {
    setLoading(!loading)
    console.log("its working", loading)
    return
  }
  return (
    <section className='bg-[#e0d3bc] z-20 sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-start px-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl tracking-wide font-semibold lg:text-6xl xl:text-7xl'>
          <span className=' specialGradient text-transparent bg-clip-text'>Baked</span>
          <span className='block'>With Passion</span>
          <span className='block'>Crafted With Love</span>
        </h1>

        <div className='space-x-8'>
          <Button noIcon title="Buy Now" onClick={onClick} loading={loading}  />
          <a className='link'>Learn More</a>
        </div>
      </div>
      <div className='relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]'>
        <Image alt="landing image" layout="fill" objectFit='contain'  src="/assets/cookiesLanding.png" />
      </div>
    </section>
  )
}

export default Landing