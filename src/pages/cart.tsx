import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../../redux/basketSlice";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import CheckOurProduct from "@/components/CheckOurProduct";

export default function Cart() {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const [groupedItemInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

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
        <div className="px-5">
          <h1 className="my04 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your Bag!" : "Your bag is empty :("}
          </h1>
          <p className="my-4">Free deliveries and Free returns!</p>
          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemInBasket).map(([key, items]) => (
              <CheckOurProduct key={key} items={items} id={key} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
