import Link from 'next/link'
import React from 'react'
import { IoIosReturnRight } from 'react-icons/io'
import NavLinks from './nav-links'

const SideNav = () => {
  return (
    <div className='flex flex-col h-full px-3 py-4 md:px-2'>
        <Link className='mb-1 flex h-20 items-end justify-start rounded-md bg-gray-100 p-4 md:h-24' href={"/"}>Tracker</Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form>
            <Link href={"/"} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              {/* <PowerIcon className="w-6" /> */}
              <IoIosReturnRight />
              <div className="hidden md:block">Go back</div>
            </Link>
          </form>
      </div>
    </div>
  )
}

export default SideNav