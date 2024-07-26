'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {  useEffect, useState, useTransition } from 'react'
import { Input } from '../ui/input'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { HiOutlineUserRemove } from "react-icons/hi";
import { deleteUser } from '@/app/admin/_actions/user'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

type User = {
    id:string,
    email:string,
    userName: string,
    order:{
        soldPrice:number
    }[]
}

export default function UserList({users}:{users:User[]}){ 
    const [search,setSearch] = useState("")
    const [filteredUsers,setFilteredUsers] = useState<User[]>(users)
    const [isPending,startTransition] = useTransition()
    const router = useRouter()

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleDeleteUser = async(id:string) => {
        startTransition(async() => {
            console.log("deleteing the user")
            try{
                await deleteUser(id)
                router.refresh()
                toast.success("User deleted successfully")
            }
            catch(error:any){
                toast.error(error.message)
            }
        })
    }
    const handleChange = (e:any) => {
        const input = e.target.value;
        if (input === "") {
            setFilteredUsers(users)
        } else {
            setFilteredUsers(users.filter(user =>
                user.userName.toLowerCase().includes(input.toLowerCase())
            ))
        }
        setSearch(input)
    }

    return (
        <>
            <div className='flex flex-row gap-6 items-center'>
                <Input placeholder="Search by username" value={search} onChange={handleChange} className='my-8 focus-visible:no-underline focus-visible:ring-offset-0'/>
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className='w-0'>
                    <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers?.map((user,index) => (
                    <TableRow key = {index}>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatNumber(user.order.length)}</TableCell>
                        <TableCell>{formatCurrency(user.order.reduce((sum,acc) => acc.soldPrice + sum,0)/100)}</TableCell>
                        <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <button className="rounded-md border p-2 hover:bg-gray-100 text-lg">
                            <span className="sr-only">Delete</span><HiOutlineUserRemove/></button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}