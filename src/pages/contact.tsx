import Checkout from '@/components/Checkout';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import crackedEgg from "../../public/assets/cracked.png"
import egg from "../../public/assets/egg.png"
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react'
import { FaEgg } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { crackEgg, selectFooterValue } from '@/redux/footer/footerSlice';

function contact() {
  const dispatch = useDispatch()
  const isEggCracked = useSelector(selectFooterValue)

  const openEgg = () => {
    dispatch(crackEgg())
  }
  return (
    <div>
      <Head>
        <title>Contact | My Cookie Jar</title>
        <link rel="icon" href="/myCookieJarIcon.ico" />
      </Head>
      <Header />
      <main>
        <Checkout />
        <Contact />
        <div className="flex items-center justify-center pt-80 ">
          {isEggCracked ? (
            <div className="flex items-center justify-center flex-col">
              <Image
                src={crackedEgg}
                alt=""
                width={25}
                height={25}
                onClick={openEgg}
              />
              <Footer />
            </div>
          ) : (
            <Image src={egg} alt="" width={25} height={25} onClick={openEgg} />
          )}
        </div>
      </main>
    </div>
  );
}

export default contact