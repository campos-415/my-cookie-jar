import CheckOurProduct from "@/components/CheckOurProduct";
import Currency from "@/components/Currency";
import StripeProducts from "@/components/StripeProducts";
import { fetchLineItems } from "@/utils/fetchLinesItems";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface Props {
  products: StripeProduct[];
}

function Success({ products }: Props) {
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subtotal = products?.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );
  // console.log(products);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabletOrMObile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMObile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
    console.log(showOrderSummary, "showOrderSummary");
  };

  return (
    <div>
      <Head>
        <title>Thank you | Cart</title>
        <link rel="icon" href="/myCookieJarIcon.ico" />
      </Head>

      <header className="mx-auto max-w-4xl">
        <Link href="/">
          <div className="relative ml-4 h-16 w-16 cursor-pointer transition lg:hidden">
            <Image
              src="/assets/cookie-logo.png"
              layout="fill"
              objectFit="contain"
              alt="logo"
            />
          </div>
        </Link>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative ml-14 h-24 w-24 hidden cursor-pointer transition lg:inline-flex">
              <Image
                src="/assets/cookie-logo.png"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
          </Link>

          <div className=" my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg ">
                Thank You!{" "}
                {/* {session ? session?.user?.split(" ")[0] : "Guest"} */}
              </h4>
            </div>
          </div>

          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Your Order is Comfirmed</p>
              <p className="text-sm text-gray-600">
                We've accepted your order, and we're getting it ready. Come back
                to this page for more updates!
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">
                Other tracking number:
              </p>
              <p>CBN21441622</p>
            </div>
          </div>

          <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Order Updates</p>
            <p className="text-sm texr-gray-600">
              You'll get Updates by email and/or text.
            </p>
          </div>
          <div className=" mx-4 lg:ml-14 text-sm flex items-center justify-center flex-col text-center">
            <p className=" text-xs w-fit lg:inline link">
              Need help? Contact us
            </p>
            {mounted && (
              <div className=" md:w-fit mt-6">
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </section>

        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}>
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  className="flex items-center space-x-2 "
                  onClick={handleShowOrderSummary}>
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p>Show summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  <Currency value={subtotal + 5.99} currency="USD" />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className="mx-auto max-w-xl divide-y  border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16 ">
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <StripeProducts items={product} id={product.id} />
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className=" flex justify-between text-sm">
                    <p>Subtotal</p>
                    <p>
                      <Currency value={subtotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Discount</p>
                    <p className="text-[gray]">
                      <Currency value={0} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Shipping</p>
                    <p className="font-medium">
                      <Currency value={5.99} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    USD
                    <span className="text-xl font-medium text-black">
                      <Currency value={subtotal + 5.99} currency="USD" />
                    </span>
                  </p>
                </div>
                <div>
                  {}
                </div>

              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return {
    props: {
      products,
    },
  };
};
