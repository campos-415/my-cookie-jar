import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SearchIcon, ShoppingCartIcon, UserIcon} from '@heroicons/react/outline'
import { selectedBasketItems,  } from '../../redux/basketSlice'
import { useSelector } from 'react-redux'

function Header() {

  const session = false
  const totalItems = useSelector(selectedBasketItems) 

  return (
    <>
      <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e0d3bc] p-4">
        <div className="flex items-center justify-center md:w-1/5">
          <Link href="/">
            <div className="relative h-20 w-20 cursor-pointer opacity-75 transition hover:opacity-100">
              <Image
                src="/assets/cookie-logo.png"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
          </Link>
        </div>
        <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
          <a className="headerLinks link">Products</a>
          <a className="headerLinks link">Explore</a>
          <a className="headerLinks link">About Us</a>
          <a className="headerLinks link">Contact</a>
        </div>
        <div className="flex items-center justify-center gap-x-4 md:w1/5">
          <SearchIcon className="headerIcon" />
          <Link href="/checkout">
            <div className="relative cursor-pointer">
             <ShoppingCartIcon className="headerIcon" />
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 justify-center items-center rounded-full specialGradient text-[10px] text-white">
                {totalItems.length}
              </span>
            </div>
          </Link>
          {session ? (
            <Image
              className="rounded-full cursor-pointer"
              src="/assets/cookie-logo.png"
              width={34}
              height={34}
              alt="userImage"
            />
          ) : (
            <UserIcon className="headerIcon" />
          )}
        </div>
      </header>
    </>
  );
}

export default Header