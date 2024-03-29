import Image from "next/image";
import { urlFor } from "../../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "@/redux/basket/basketSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import Notification from "./Notification";

interface Props {
  product: Product;
  id: string;
  loading: boolean;
}

function Product({ product, id, loading }: Props) {
  const dispatch = useDispatch();
  const imageUrl = urlFor(product.image[0]).url();
  const selectedByGroup = useSelector((state: RootState) =>
    selectBasketItemsWithId(state.basket, id)
  );
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.custom((t) => (
      <Notification // custom toast component located @Components
        t={t}
        text="Has been removed from basket"
        icon="❌"
        imageUrl={imageUrl}
        product={product}
      />
    ), {
      duration:300
    });
  };

  function addProductToBasket() {
    dispatch(addToBasket(product));
    toast.custom(
      (t) => (
        <Notification // custom toast component located @Components
          t={t}
          text="Has been added from basket"
          icon="✅"
          imageUrl={imageUrl}
          product={product}
        />
      ),
      {
        duration: 300,
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="relative h-[350px] w-[350px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Image
              layout="fill"
              objectFit="contain"
              className="p-8"
              src={imageUrl}
              alt="product image"
            />
          )}
        </div>
        <div className="px-5 pb-5">
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight max-w-[300px] dark:text-white overflow-hidden whitespace-nowrap truncate ">
            {product.title}
          </h3>
          <div className="flex items-center justify-end space-x-3 pb-4">
            <h3 className="text-gray-300 font-semibold text-sm tracking-tight dark:text-gray-500">
              Quantity
            </h3>
            <span className="text-gray-900 font-semibold text-sm tracking-tight dark:text-white">
              {selectedByGroup?.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              <span className="text-indigo-600">$</span>
              {product?.price}
            </p>
            <div className="grid grid-cols-2 space-x-2 ">
              <button
                disabled={selectedByGroup?.length === 0}
                onClick={removeItemFromBasket}
                className="disabled:text-indigo-300 w-8 h-8 cursor-pointer select-none  text-indigo-500 hover:text-indigo-600  font-medium rounded-lg  text-center dark:text-indigo-600 dark:hover:text-indigo-700 dark:focus:ring-indigo-800">
                <MinusCircleIcon />
              </button>
              <PlusCircleIcon
                onClick={addProductToBasket}
                className=" w-8 h-8 cursor-pointer select-none  text-indigo-500 hover:text-indigo-600  font-medium rounded-lg  text-center dark:text-indigo-600 dark:hover:text-indigo-700 dark:focus:ring-indigo-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
