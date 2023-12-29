import { Tab, TabPanelsProps } from "@headlessui/react";

function MyTabs() {
  const categories = [
    { id: "1", selected: true, title: "Cookies" },
    { id: "2", selected: false, title: "Muffins" },
  ];

  function showProducts({ products }: any) {
    console.log(products)

    return <>hello</>
  }

  return (
    <Tab.Group>
      <Tab.List className="flex justify-center">
        {categories.map((category) => (
          <Tab
            key={category.id}
            id={category.id}
            className={({ selected }) => `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${selected ? "borderGradient bg-[#35383C] text-white" : "border-b-2 border-[#35383C] text-[#747474]"}`}>{category.title}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
        <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
 export default MyTabs