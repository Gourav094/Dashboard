'use client'
import { DropdownMenuLabel } from "../ui/dropdown-menu"
import { IoIosReturnRight } from 'react-icons/io'
import { signOut } from 'next-auth/react'; 


export default function SignoutButton() {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <DropdownMenuLabel className="flex gap-2 cursor-pointer" onClick={handleSignOut}>
            <IoIosReturnRight className="size-5" />
            Sign out
        </DropdownMenuLabel>
    );
}