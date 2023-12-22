import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header>
      <Link href="">
        <div className='relative h-10 w-5 cursor-pointer opacity-75 '>
          <Image src="/assets/cookie-logo.png"  width={100} height={100} alt='logo'/>
        </div>
      
      </Link>


    </header>
  )
}

export default Header