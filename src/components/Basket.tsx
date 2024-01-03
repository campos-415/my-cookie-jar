import React from "react";
import { useSelector } from "react-redux";
import { selectedBasketItems } from "../../redux/basketSlice";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";

function Basket() {
  const items = useSelector(selectedBasketItems);

  if (items.length === 0) return null;
  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-40 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items.length > 0 && (
          <span className=" absolute -right-2 -top-2 z-40 flex h-7 w-7 items-center justify-center rounded-full specialGradient text-[10px] text-white">
            {items.length}
          </span>
        )}
        <ShoppingCartIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
}

export default Basket;
