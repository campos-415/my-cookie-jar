import Image from 'next/image';
import React from 'react'
import toast, { Toast } from 'react-hot-toast';
interface Props {
  t: Toast;
  isLoading: boolean;
  imageUrl: string;
  handleImageLoad: () => void;
  product?: Product 
  products?: Product[]
  text: string
  icon:string

}
function Notification({t, isLoading, imageUrl, handleImageLoad, product, products, text, icon}: Props) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
              </div>
            )}
            <Image
              className={`h-10 w-10`}
              width={100}
              height={100}
              src={imageUrl}
              alt=""
              onLoad={handleImageLoad}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {product?.title || products?.[0].title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {text}{" "}{icon}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Close
        </button>
      </div>
    </div>
  );
}

export default Notification