import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import Image from "next/image";
import { urlFor } from "../../sanity";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  selectBasketTotal,
} from "@/redux/basket/basketSlice";
import { selectModalValue, toggleModal } from "@/redux/modal/modalSlice";
import { RootState } from "@/redux/store";
import { getDiffieHellman } from "crypto";
import toast from "react-hot-toast";
import CheckOurProduct from "./CheckOurProduct";

interface Props {
  categories: Category[];
}

export default function Checkout() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const isOpen = useSelector(selectModalValue);
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const quantity = useSelector((state: RootState) =>
    selectBasketItemsWithId(state.basket, id)
  );
  const [groupedItemInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  function handleModal() {
    dispatch(toggleModal());
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  useEffect(() => {
    const groupedItems = items?.reduce(
      (results, item) => {
        (results[item._id] = results[item._id] || []).push(item);
        setId(results[item._id][0]._id);
        console.log(results[item._id][0]._id);
        return results;
      },
      {} as { [key: string]: Product[] }
    );

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleModal}>
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {items.length > 0 ? (
                        "Review your Bag!"
                      ) : (
                        <div className="flex items-center justify-center relative h-[350px] w-[350px] transition-all duration-500  lg:h-[350px] lg:w-[300px]">
                          <Image
                            alt="landing image"
                            layout="fill"
                            objectFit="contain"
                            src="/assets/emptyCart.svg"
                          />
                        </div>
                      )}
                      <div className="mt-8">
                        <div className="flow-root">
                          <div
                            role="list"
                            className="-my-6 divide-y divide-gray-200">
                            {Object.entries(groupedItemInBasket).map(
                              ([key, items]) => (
                                <CheckOurProduct
                                  key={key}
                                  items={items}
                                  id={key}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          <Currency quantity={basketTotal} currency="USD" />
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          disabled={quantity.length === 0}
                          className=" disabled:bg-indigo-300 disabled:cursor-not-allowed  w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={handleModal}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}