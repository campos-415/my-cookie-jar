import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "../../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  BasketState,
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "@/redux/basket/basketSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";

interface Props {
  product: Product;
  id: string;
}

function Product({ product, id }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedItems = useSelector(selectBasketItems);
  const selected = useSelector((state:RootState) => selectBasketItemsWithId(state.basket, id));

  function clickme() {
    console.log(selected, "product test")
  }
  const imageUrl = urlFor(product.image[0]).url();

  function addProductToBasket() {
    dispatch(addToBasket(product));
    toast.success(`${product.title} Has been added to the basket!`);

  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${product.title} removed from basket`, {
      position: "bottom-center",
    });
  };

  

  return (
    <div className="flex h- h-full w-[240px] min-[320px]:w-[250px] sm:h-[300px] select-none flex-col spcae-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={imageUrl}
          layout="fill"
          objectFit="contain"
          alt="ProductImage"
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2 text-xl text-white md:text-2xl">
            <p>{product?.title}</p>
            <p> $ {product?.price}</p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <MinusCircleIcon
              className="w-6 h-6 md:h-10 md:w-10 hover:text-white hover:cursor-pointer"
              onClick={removeItemFromBasket}
            />
            <div className="relative cursor-pointer">
              {selectedItems
                ?.filter((item) => item?._id === product?._id)
                ?.map((_,key) => (
                  <span key={key} className="absolute -right-1 -top-1 z-50 flex h-4 w-4 justify-center items-center rounded-full bg-red-500 text-[10px] text-white">
                    {selected?.length}
                  </span>
                ))}
              <ShoppingBagIcon onClick={clickme} className="text-white w-8 h-8 md:h-12 md:w-12" />
            </div>
            <PlusCircleIcon
              className="w-6 h-6 md:h-10 md:w-10 hover:text-white hover:cursor-pointer"
              onClick={addProductToBasket}
            />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
