import Image from 'next/image';
import React from 'react'
import Currency from './Currency';
interface Props {
  items: StripeProduct
  id: string

}


function StripeProducts({ items, id }: Props) {


  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
        <Image
          src="/assets/cookie-logo.png"
          height={100}
          width={100}
          alt="Product Image/ Logo Image"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{items?.description}</h3>
            <p className="ml-4">
              <Currency value={items?.price.unit_amount / 100} currency="USD" />
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {items.quantity}</p>
        </div>
      </div>
    </li>
  );
}

export default StripeProducts