import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import CheckOurProduct from "@/components/CheckOurProduct";
import Currency from "react-currency-formatter";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { selectBasketItems, selectBasketTotal } from "@/redux/basket/basketSlice";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const basketTotal = useSelector(selectBasketTotal);
  const [isActive, setIsActive] = useState(false);
  const [groupedItemInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  function showForm() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const groupedItems = items.reduce(
      (results, item) => {
        (results[item._id] = results[item._id] || []).push(item);
        return results;
      },
      {} as { [key: string]: Product[] }
    );

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>My Cookie Jar | Cart</title>
        <link rel="icon" href="/myCookieJarIcon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5 flex items-center justify-center flex-col" >
          <h1 className="my04 text-3xl font-semibold lg:text-4xl">
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
          </h1>
          <p className="my-4">Free deliveries and Free returns!</p>
          {items.length === 0 && (
            <div className="mt-6">
              <Link
                href="/"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemInBasket).map(([key, items]) => (
              <CheckOurProduct key={key} items={items} id={key} />
            ))}

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
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Checkout
                </a>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
