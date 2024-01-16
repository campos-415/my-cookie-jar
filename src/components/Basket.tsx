import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { selectBasketItems } from "@/redux/basket/basketSlice";
import { selectModalValue } from "@/redux/modal/modalSlice";

function Basket() {
  const items = useSelector(selectBasketItems);
  const isOpen = useSelector(selectModalValue)

  console.log(isOpen)
  if (items?.length === 0 || isOpen) return null;
  return (
    <Link href="/cart">
      <div className="fixed bottom-10 right-10 z-40 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items?.length > 0 && (
          <span className=" absolute -right-2 -top-2 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {items?.length}
          </span>
        )}
        <ShoppingCartIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
}

export default Basket;
