import Image from 'next/image'
import React from 'react'
import { urlFor } from '../../sanity'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../../redux/basketSlice'
import toast from 'react-hot-toast'


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

  console.log(imageUrl)

  return (
    <div className='flex h-fit w-[280px] select-none flex-col spcae-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10'>
      <div className='relative h-64 w-full md:h-72'>
        <Image src={imageUrl} layout='fill' objectFit='contain' alt='ProductImage' />
      </div>
      <div className='flex flex-1 items-center justify-between space-x-3'>
        <div className='space-y-2 text-xl text-white md:text-2xl'>
          <p>{ product.title }</p>
          <p> $ { product.price }</p>
        </div>
        <div className='shoppingCartIconStyle' onClick={addProductToBasket}>
          <ShoppingCartIcon  className='text-white w-5 h-5 md:w-8 md:h-8'/>
        </div>
      </div>
    </div>
  )
}

export default Product