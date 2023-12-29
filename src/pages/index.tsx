import Image from 'next/image'
import Header from '@/components/Header'
import Landing from '@/components/Landing';
import { Tab } from "@headlessui/react";
import MyTabs from '@/components/Tabs';
import { GetServerSideProps } from 'next';
import { fetchCategories } from '@/utils/fetchCategories';
import { fetchProducts } from '@/utils/fetchProducts';

interface Props {
  categories: Category[]
  products: Product[]
}


export default function Home({ categories, products }: Props) {
  console.log(categories)
  return (
    <>
      <Header />
      <main className="relative h-[200vh]">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] bg-[#1b1b1b] h-screen">
        <div className="space-y-10 pt-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h1>

          <div>
            <MyTabs categories={categories} products={products} />
          </div>
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
