'use client'
import { ActiveToggleDropdown, DeleteToggleDropdown } from '@/components/products/ProductDropDown'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { formatCurrency, formatNumber } from '@/lib/formatters'
import clsx from 'clsx'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'

type Product = {
    id:string,
    isAvailable:boolean,
    name:string,
    description:string,
    price:number,
    _count: {
        order: number
    }
}

export default function ProductList({products} : {products:Product[]}){
    const [search,setSearch] = useState("")
    const [filteredProducts,setFilteredProducts] = useState<Product[]>(products)
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);


    const handleChange = (e:any) => {
        const input = e.target.value;
        if (input === "") {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(input.toLowerCase())
            ))
        }
        setSearch(input)
    }

    return (
        <div>
            <h2 className='text-base md:text-xl font-medium'>Products</h2>
            <div className='flex flex-row gap-6 items-center'>
                <Input placeholder="Search by product name" value={search} onChange={handleChange} className='my-8 focus-visible:no-underline focus-visible:ring-offset-0'/>
                <Link href={"/admin/products/new"}>
                <Button className="" size={"md"}>
                    + Add Product
                </Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className=''>
                    <span className=''>Status</span>
                    </TableHead>
                    <TableHead className='w-0'>
                    <span className='sr-only'>Action</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts?.map(product => (
                    <TableRow key = {product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.order)}</TableCell>
                        <TableCell>
                        <span className={clsx(
                            'inline-flex items-center rounded-full px-2 py-1 text-xs',
                            {
                            'bg-gray-100 text-gray-500': product.isAvailable === false,
                            'bg-green-500 text-white': product.isAvailable === true,
                            },
                        )}>
                            {product.isAvailable ? (
                                <>
                                    Available
                                </>
                            ) : (
                                <>
                                    Not Available
                                </>
                            )}
                        </span>
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                            <MoreVertical/>
                            <span className='sr-only'>Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                <a href={`/admin/products/${product.id}`}>View</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <ActiveToggleDropdown id = {product.id} isAvailable = {product.isAvailable}></ActiveToggleDropdown>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DeleteToggleDropdown id = {product.id} orders = {product._count.order > 0}></DeleteToggleDropdown>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
    
}