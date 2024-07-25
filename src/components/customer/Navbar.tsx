import { auth, signOut } from '@/auth'
import Image from 'next/image'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import Link from 'next/link'
import SignoutButton from './SignoutButton';

const Navbar = async () => {

    const session = await auth()
    console.log(session)

    return (
        <div className='bg-violet-50 bg-opacity-70 top-0 z-50 sticky'>
            <div className='py-5 px-4 flex justify-between items-center max-w-7xl mx-auto'>
                <Image src="logo.svg" width={150} height={50} alt="logo" />
                <div>
                    <ul className='flex gap-6 text-[18px] text-gray-700 items-center'>
                        <li className='cursor-pointer hover:text-gray-950' >Home</li>
                        <li className='cursor-pointer hover:text-gray-950' >Cart</li>
                        <li className='cursor-pointer hover:text-gray-950' >Orders</li>
                        <li className='cursor-pointer hover:text-gray-950' >About</li>
                        {
                            !session?.user?.email ? (
                                <Link href={"/login"} className='cursor-pointer hover:text-gray-950' >Login</Link>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        {
                                            session?.user?.image ? (
                                                <Image className='rounded-full cursor-pointer' src={session?.user?.image} width={30} height={30} alt='user' />
                                            ) : (
                                                <li className='h-8 w-8 rounded-full bg-violet-200 cursor-pointer items-center flex justify-center'>G</li>
                                            )
                                        }
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mt-2 py-2 px-2 font-light">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel >
                                                <Link href={"/profile"} className='flex gap-2 '>
                                                    <AiOutlineUser className='size-5'/>Profile
                                                </Link>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel >
                                                <Link href={"/admin/dashboard"} className='flex gap-2 '>
                                                    <MdOutlineSpaceDashboard  className='size-5'/>Dashboard
                                                </Link>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <SignoutButton/>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
