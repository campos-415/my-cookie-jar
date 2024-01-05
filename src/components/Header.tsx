import Image from 'next/image'
import Links from 'next/link'
import React from 'react'
import { SearchIcon, ShoppingCartIcon, UserIcon} from '@heroicons/react/outline'
import { selectBasketItems,  } from '../../redux/basketSlice'
import { useSelector } from 'react-redux'
import {
  Link ,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

function Header() {

  const session = false
  const totalItems = useSelector(selectBasketItems) 
  const handleSetActive = (to:string) => {
    console.log(to);
  };

  return (
    <>
      <header className="relative top-0 z-0 flex w-full items-center justify-between bg-[#e0d3bc] p-4">
        <div className="flex items-center justify-center md:w-1/5">
          <Links href="/">
            <div className="relative h-20 w-20 cursor-pointer opacity-75 transition hover:opacity-100">
              <Image
                src="/assets/cookie-logo.png"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
          </Links>
        </div>
        <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
          <Link
            activeClass="active"
            to="products"
            spy={true}
            smooth={true}
            offset={50}
            duration={900}
            onSetActive={handleSetActive}
            className="headerLinks link">
            Products
          </Link>
          <a className="headerLinks link">About Us</a>
          <a className="headerLinks link">Contact</a>
        </div>
        <div className="flex items-center justify-center gap-x-4 md:w1/5">
          <SearchIcon className="headerIcon" />
          <Links href="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCartIcon className="headerIcon" />
              {totalItems.length > 0 && (
                <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 justify-center items-center rounded-full specialGradient text-[10px] text-white">
                  {totalItems.length}
                </span>
              )}
            </div>
          </Links>
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