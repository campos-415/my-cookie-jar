import React from 'react'
interface Props {
  title: string, 
  onClick?: () => void,
  width?: string,
  loading?: boolean,
  padding?: string,
  noIcon?: boolean
}

function Button({title, onClick, width, loading, padding, noIcon}:Props) {
  return (
    <>
      <button
        className={` ${
          width ? width : "w-auto"
        } ${padding} ease group z-30 box-border relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#896145] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group`}
        onClick={onClick}>
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out specialGradient group-hover:h-full text-black">
        </span>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          {noIcon && (
            <svg
              className="w-5 h-5 text-[#896145]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          )}
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg
            className="w-5 h-5 text-[#fff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
          {loading ? "Loading" : title }
        </span>
      </button>
    </>
  );
}

export default Button