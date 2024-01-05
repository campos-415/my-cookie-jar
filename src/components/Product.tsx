import Image from 'next/image'
import React from 'react'
import { urlFor } from '../../sanity'
import { MinusCircleIcon, PlusCircleIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../../redux/basketSlice'
import toast from 'react-hot-toast'
import CookieBagIcon from './CookieBagIcon'


interface Props {
  product: Product
}

function Product({ product }: Props) {
  

  const imageUrl = urlFor(product.image[0]).url()

  const dispatch = useDispatch()

  function addProductToBasket() {
    dispatch(addToBasket(product))
    toast(`${product.title} Has been added to the basket!`)
  }

  const id = product._id
  function removeItemFromBasket() {
    dispatch(removeFromBasket({ id }))
    toast.success(`${product.title} was removed from cart`)
  }

  console.log(imageUrl)

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
        <div className='flex flex-col space-y-4'>
          <div className="space-y-2 text-xl text-white md:text-2xl">
            <p>{product.title}</p>
            <p> $ {product.price}</p>
          </div>
          <div className='flex items-center justify-center'>
            <MinusCircleIcon className='w-6 h-6 md:h-10 md:w-10' />
            <ShoppingBagIcon className='w-8 h-8 md:h-12 md:w-12' />
            <PlusCircleIcon className='w-6 h-6 md:h-10 md:w-10' />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Product


{
  /* <button
          className="shoppingCartIconStyle"
          onClick={addProductToBasket}>
          <ShoppingCartIcon className="text-white w-full h-full md:w-12 md:h-12 hover:text-black " />
        </button> */
}