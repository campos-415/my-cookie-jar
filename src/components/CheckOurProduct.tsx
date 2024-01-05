import Currency from "react-currency-formatter";
import Image from "next/image";
import React from "react";
import { urlFor } from "../../sanity";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/outline";
import { removeFromBasket } from "../../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

function CheckOurProduct({ items, id }: Props) {
  
  const dispatch = useDispatch()

  const removeItemFromBasket =  () => {
    dispatch(removeFromBasket({ id }))
    
    toast.error(`${items[0].title} removed from basket`,{position:"bottom-center"})
    
  }

  return (
    <div className="flex flex-col gap-x-4 border-b border-black pt-2 pb-8 lg:flex-row lg:items-center">
      <div className="relative w-44 h-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
          alt="Product Image"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="w-6 h-6 text-blue-500" />
            </p>
          </div>
          <p className="flex cursor-pointer hover:underline items-end gap-x-1  text-blue-500">
            Show Product Details
            <ChevronDownIcon className="w-6 h-6 text-blue-500" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency="USD"
            />
          </h4>
          <button className=" hover:scale-105" onClick={removeItemFromBasket}>
            <TrashIcon className="text-blue-500 w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOurProduct;
