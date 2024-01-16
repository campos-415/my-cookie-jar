import Image from "next/image";
import Links from "next/link";
import React from "react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { useRouter } from "next/router";
import { selectBasketItems } from "@/redux/basket/basketSlice";
import { selectModalValue, toggleModal } from "@/redux/modal/modalSlice";
// import { isOpen } from '../../redux/modalSlice/checkoutModal'

function Header() {
  const session = false;
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModalValue);
  const totalItems = useSelector(selectBasketItems);

  function handleModal() {
    dispatch(toggleModal());
  }

  return (
    <>
      <header className="relative top-0 z-0 flex w-full items-center justify-between p-4">
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
          {router.pathname === "/cart" ? (
            <Links href="/#products" className="headerLinks link">
              Products
            </Links>
          ) : (
            <Link
              activeClass="active"
              to="products"
              spy={true}
              smooth={true}
              offset={50}
              duration={900}
              className="headerLinks link">
              Products
            </Link>
          )}

          <a className="headerLinks link">About Us</a>
          <a className="headerLinks link">Contact</a>
        </div>
        <div className="flex items-center justify-center gap-x-4 md:w1/5">
          <SearchIcon className="headerIcon" />
          <div className="relative cursor-pointer">
            <ShoppingCartIcon className="headerIcon" onClick={handleModal} />
            {totalItems?.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 justify-center items-center rounded-full bg-red-500 text-[10px] text-white">
                {totalItems?.length}
              </span>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
