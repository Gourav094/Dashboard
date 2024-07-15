'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import clsx from 'clsx';
import { MdDashboard, MdOutlineLocalOffer } from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';
import { IoCartOutline } from 'react-icons/io5';

const links = [
    {
        name:"Dashboard",
        href:"/admin/dashboard",
        icon: <MdDashboard />
    },
    {
        name:"Products",
        href:"/admin/products",
        icon:<IoCartOutline />
    },
    {
        name:"Customers",
        href:"/admin/customers",
        icon:<TbUsersGroup />
    },
    {
        name:"Coupons",
        href:"/admin/coupons",
        icon: <MdOutlineLocalOffer />
    }
]

const NavLinks = () => {
    const path = usePathname()
  return (
    <div>
        {links.map((link) => {
            const icon = link.icon;
            return (
                <Link key={link.name} href={link.href} 
                    className={clsx(`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start  md:px-3 my-1
                    `,{
                      'bg-sky-100 text-blue-600': path === link.href
                    })}
                >
                    <p>{icon}</p>
                    {link.name}
                </Link>

            )
        })}
    </div>
  )
}

export default NavLinks