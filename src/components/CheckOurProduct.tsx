import Image from "next/image";
import React from "react";
import { urlFor } from "../../sanity";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { removeFromBasket } from "@/redux/basket/basketSlice";
import Currency from "./Currency";

interface Props {
  items: Product[]
  id: string;
}

function CheckOurProduct({ items, id }: Props) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={urlFor(items[0].image[0]).url()}
          height={100}
          width={100}
          alt="Product Image"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{items[0]?.title}</h3>
            <p className="ml-4">
              <Currency
                value={items.reduce((total, item) => total + item.price, 0)}
                currency="USD"
              />
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{items[0].categoryName}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {items.length}</p>

          <div className="flex">
            <button
              onClick={removeItemFromBasket}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CheckOurProduct;
