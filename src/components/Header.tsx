import Image from "next/image";
import Links from "next/link";
import React from "react";
import { HomeIcon, PhoneIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import { useRouter } from "next/router";
import { selectBasketItems } from "@/redux/basket/basketSlice";
import { toggleModal } from "@/redux/modal/modalSlice";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
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
          {router.pathname === "/" ? (
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
          ) : (
            <Links href="/#products" className="headerLinks link">
              Products
            </Links>
          )}

          {/* <a className="headerLinks link">About Us</a> */}
          <Links href={"/contact"}>
            <span className="headerLinks link">Contact</span>
          </Links>
        </div>
        <div className="flex items-center justify-center gap-x-4 md:w1/5">
          {router.pathname === "/contact" ? (
            <Links href={"/"}>
              <HomeIcon className="headerIcon md:hidden" />
            </Links>
          ) : (
            <Links href={"/contact"}>
              <PhoneIcon className="headerIcon md:hidden" />
            </Links>
          )}

          <div className="relative cursor-pointer">
            {router.pathname === "/cart" ? (
              <Links href={"/"}>
                <HomeIcon className="headerIcon md:hidden" />
              </Links>
            ) : (
              <ShoppingCartIcon className="headerIcon" onClick={handleModal} />
            )}
            {totalItems?.length > 0 &&
              router.pathname !== 
                "/cart" ? (
                  <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 justify-center items-center rounded-full bg-red-500 text-[10px] text-white">
                    {totalItems?.length}
                  </span>
                ):""}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
