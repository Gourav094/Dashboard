import { Coupon } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import Link from "next/link";
import { Button } from "../ui/button";
import { GoDotFill } from "react-icons/go";
import { formatCurrency } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import { ActiveToggleDropdown, DeleteToggleDropdown } from "./CouponDropdown";

export default function CouponTable({ coupons }: { coupons: Coupon[] }) {
    return (
        <div>
            <div className='flex flex-row gap-6 my-5 items-center'>
                <Link href={"/admin/coupons/new"}>
                    <Button className="" size={"md"}>
                        + Add Coupon
                    </Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-0'>
                            <span className='sr-only'>Active Status</span>
                        </TableHead>
                        <TableHead>Coupon code</TableHead>
                        <TableHead>Min order value</TableHead>
                        <TableHead>Max discount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className='w-0'>
                            <span className='sr-only'>Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coupons?.map(coupon => (
                        <TableRow key={coupon.id}>
                            <TableCell>{coupon.isAvailable ? (
                                <>
                                    <GoDotFill className='text-green-600 text-lg ' />
                                    <span className='sr-only'>Active</span>
                                </>
                            ) : (
                                <>
                                    <GoDotFill className='text-red-600 text-lg ' />
                                    <span className='sr-only'>Unactive</span>
                                </>
                            )}</TableCell>
                            <TableCell>{coupon.code}</TableCell>
                            <TableCell>{formatCurrency(coupon.minOrderValue)}</TableCell>
                            <TableCell>{formatCurrency(coupon.maxDiscount)}</TableCell>
                            <TableCell>{coupon.description}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger >
                                        <MoreVertical />
                                        <span className='sr-only'>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <a href={`/admin/coupons/${coupon.id}`}>View</a>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={`/admin/coupons/${coupon.id}/edit`}>Edit</Link>
                                            </DropdownMenuItem>
                                            <ActiveToggleDropdown id={coupon.id} isAvailable={coupon.isAvailable}></ActiveToggleDropdown>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DeleteToggleDropdown id={coupon.id}></DeleteToggleDropdown>
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