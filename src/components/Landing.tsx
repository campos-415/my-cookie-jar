import React, { useState } from 'react'
import Button from './Button'
import Image from 'next/image'

function Landing() {
  const [loading, setLoading] = useState(false)

  function onClick() {
    setLoading(!loading)
    return
  }
  return (
    <section className='fixed w-full h-full top-24'>
      <div className=" mx-auto flex h-screen max-w-[7776px] items-center justify-between space-x-3 px-8">
        <div className="space-y-8 ">
          <h1 className="space-y-3 text-5xl tracking-wide font-semibold lg:text-6xl xl:text-7xl">
            <span className=" textGradient">
              Baked
            </span>
            <span className="block ">With Passion</span>
            <span className="block  textGradient">Crafted With Love</span>
          </h1>

          <div className="space-x-8">
            <Button noIcon title="Buy Now" onClick={onClick} loading={loading} />
            <a className="link">Learn More</a>
          </div>
        </div>
        <div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]">
          <Image
            alt="landing image"
            layout="fill"
            objectFit="contain"
            src="/assets/cookiesLanding.png"
          />
        </div>
      </div>

    </section>
  );
}

export default Landing