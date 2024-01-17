import Checkout from '@/components/Checkout';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import crackedEgg from "../../public/assets/cracked.png"
import egg from "../../public/assets/egg.png"
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { crackEgg, selectFooterValue } from '@/redux/footer/footerSlice';
import EasternEgg from '@/components/EasternEgg';

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
      </main>
        <EasternEgg isEggCracked={isEggCracked} openEgg={openEgg} egg={egg} crackedEgg={crackedEgg} padding='pt-64'  />
    </div>
  );
}

export default contact