'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MoreVertical } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { DeleteDropdown } from './UserDropdown'

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
                    <TableHead>Email</TableHead>
                    <TableHead>UserName</TableHead>
                    <TableHead>orders</TableHead>
                    <TableHead>value</TableHead>
                    <TableHead className='w-0'>
                    <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers?.map((user,index) => (
                    <TableRow key = {index}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{formatNumber(user.order.length)}</TableCell>
                        <TableCell>{formatCurrency(user.order.reduce((sum,acc) => acc.soldPrice + sum,0)/100)}</TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                            <MoreVertical/>
                            <span className='sr-only'>Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            {/* <DropdownMenuGroup>
                                <DropdownMenuItem>
                                <a href={`/users/${user.id}`}>View</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <ActiveToggleDropdown id = {user.id} isAvailable = {user.isAvailable}></ActiveToggleDropdown>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>*/}
                                <DeleteDropdown id = {user.id}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}