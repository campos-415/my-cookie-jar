import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="flex items-center justify-center text-xs sm:text-md">
      <div className="hover:text-black">
        <span className="hover:text-black">Developed by &nbsp;</span>
        <Link href={"https://www.cesarcampos.dev"}>
          <span className="link hover:text-indigo-500 hover:cursor-pointer text-xs font-bold">
            Cesar Campos
          </span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer