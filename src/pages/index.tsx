import Header from '@/components/Header'
import Landing from '@/components/Landing';
import MyTabs from '@/components/Tabs';
import { GetServerSideProps } from 'next';
import { fetchCategories } from '@/utils/fetchCategories';
import { fetchProducts } from '@/utils/fetchProducts';
import Basket from '@/components/Basket';
import Head from 'next/head';
import Checkout from '@/components/Checkout';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { crackEgg, selectFooterValue } from '@/redux/footer/footerSlice';
import crackedEgg from "../../public/assets/cracked.png";
import egg from "../../public/assets/egg.png";
import EasternEgg from '@/components/EasternEgg';

interface Props {
  categories: Category[]
  products: Product[]
  loading: boolean
}


export default function Home({ categories, products, loading }: Props) {
   const dispatch = useDispatch();
   const isEggCracked = useSelector(selectFooterValue);

   const openEgg = () => {
     dispatch(crackEgg());
   };

  return (
    <>
      <Head>
        <title>My Cookie Jar | Home</title>
        <link rel="icon" href="/myCookieJarIcon.ico" />
      </Head>
      <Header />

      <main className="mainLanding">
        <Checkout />
        <Landing />
      </main>
      <section id="products" className="productSection">
        <Basket />
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Products
          </h1>
          <MyTabs
            categories={categories}
            products={products}
            loading={loading}
          />
        </div>
        <div className="flex items-center justify-center pt-8">
        </div>
          <EasternEgg
            isEggCracked={isEggCracked}
            openEgg={openEgg}
            egg={egg}
            crackedEgg={crackedEgg}
          />
      </section>
    </>
  );
}

//Backend Code 

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let loading = true
  const categories = await fetchCategories()
  const products = await fetchProducts()
  loading = false
  return {
    props: {
      categories,
      products,
      loading,
    }
  }
} 
