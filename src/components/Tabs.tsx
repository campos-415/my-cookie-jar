import { Tab } from "@headlessui/react";
import Product from "./Product";
interface props {
  categories: Category[]
  products: Product[]
  loading: boolean
}

function MyTabs({ categories, products, loading }: props) {
 
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => (<Product loading={loading} product={product} key={product._id} id={ product._id} />))
  }


  return (
    <Tab.Group>
      <Tab.List className="sticky top-0 z-30  flex justify-center bg-[#1b1b1b]">
        {categories.map((category) => (
          <Tab
            key={category._id}
            id={category._id}
            className={({
              selected,
            }) => `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm
             font-light outline-none md:py-4 md:px-6 md:text-base
             ${
               selected
                 ? "borderGradient bg-white  text-black"
                 : "border-b-2 border-[#35383C] text-[#747474]"
             }`}>
            {category.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4 flex justify-between">
        <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
 export default MyTabs