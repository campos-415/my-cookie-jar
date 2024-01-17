import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CheckOurProduct from "@/components/CheckOurProduct";
import { selectBasketItems, selectBasketTotal } from "@/redux/basket/basketSlice";
import Link from "next/link";
import Image from "next/image";
import Currency from "@/components/Currency";
import Checkout from "@/components/CheckoutModal";
import Stripe from "stripe";
import getStripe from "@/utils/get-stripe";
import { fetchPostJSON } from "@/utils/api-helpers";
import Footer from "@/components/Footer";
import crackedEgg from "../../public/assets/cracked.png";
import egg from "../../public/assets/egg.png";
import { crackEgg, selectFooterValue } from "@/redux/footer/footerSlice";
import EasternEgg from "@/components/EasternEgg";

export default function Cart() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [loading, setLoading] = useState(false)
  const [groupedItemInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
    const dispatch = useDispatch();
    const isEggCracked = useSelector(selectFooterValue);

    const openEgg = () => {
      dispatch(crackEgg());
    };
  const createCheckoutSession = async () => {
    setLoading(true)

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON("/api/checkout_sessions", {
      items: items,
    })

    //Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    //Redirect to Checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      //Make the `Id` field from the Checkouts Session creation API response
      //avaiable to this file, so you can provide it as parameter here
      //instead of the {{CHECKOUT_SESSION_ID}} placeholder
      sessionId: checkoutSession.id
    })

    //If "redirectToCheckout" fails due to a browser or network 
    // error, display the localized error message to your costumer
    // using `error.message`.
    console.warn(error.message)

    setLoading(false)

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
        <Checkout />
        <div className="px-5 flex items-center justify-center flex-col">
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
          {items.length === 0 && (
            <div className="mt-6">
              <Link
                onClick={() => setLoading(true)}
                href="/"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                {loading ? (
                  <span className="flex items-center space-x-2 justify-center ">
                    <p>Loading </p>
                    <AiOutlineLoading3Quarters className="animate-spin block w-5 h-5 m-0 p-0" />
                  </span>
                ) : (
                  "Continue Shopping"
                )}
              </Link>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            <div className="mt-8">
              <div className="flow-root">
                <div role="list" className="-my-6 divide-y divide-gray-200">
                  {Object.entries(groupedItemInBasket).map(([key, items]) => (
                    <CheckOurProduct key={key} items={items} id={key} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  <Currency value={basketTotal} currency="USD" />
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={createCheckoutSession}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  {loading ? (
                    <span className="flex items-center space-x-2 justify-center ">
                      <p>Loading </p>
                      <AiOutlineLoading3Quarters className="animate-spin block w-5 h-5 m-0 p-0" />
                    </span>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link
                    href={"/"}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
        <EasternEgg
          isEggCracked={isEggCracked}
          openEgg={openEgg}
          egg={egg}
          crackedEgg={crackedEgg}
          padding="pt-24 md:pt-56"
        />
      </main>
    </div>
  );
}

