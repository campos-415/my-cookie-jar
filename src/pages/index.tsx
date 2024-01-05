import Header from '@/components/Header'
import Landing from '@/components/Landing';
import MyTabs from '@/components/Tabs';
import { GetServerSideProps } from 'next';
import { fetchCategories } from '@/utils/fetchCategories';
import { fetchProducts } from '@/utils/fetchProducts';
import Basket from '@/components/Basket';
import Head from 'next/head';

interface Props {
  categories: Category[]
  products: Product[]
}


export default function Home({ categories, products }: Props) {
  console.log(categories)


  return (
    <>
      <Head>
        <title>My Cookie Jar | Home</title>
        <link rel="icon" href="/myCookieJarIcon.ico" />
      </Head>
      <Header />

      <main>
        <Landing />
      </main>
      <section id='products' className="productSection">
        <Basket />
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Products
          </h1>
          <MyTabs categories={categories} products={products} />
        </div>
      </section>
    </>
  );
}

//Backend Code 

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  
  const categories = await fetchCategories()
  const products = await fetchProducts()
  return {
    props: {
      categories,
      products,
    }
  }
} 
