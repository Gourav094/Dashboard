import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-violet-50 bg-opacity-70 top-0 z-50 sticky'>
            <div className='py-5 px-4 flex justify-between items-center max-w-7xl mx-auto'>
                <Image src="logo.svg" width={150} height={100} alt="logo"/>
                <div>
                    <ul className='flex gap-6 text-[18px] text-gray-700'>
                        <li className='cursor-pointer hover:text-gray-950' >Home</li>
                        <li className='cursor-pointer hover:text-gray-950' >Cart</li>
                        <li className='cursor-pointer hover:text-gray-950' >Orders</li>
                        <li className='cursor-pointer hover:text-gray-950' >About</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
