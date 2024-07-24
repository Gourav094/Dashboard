'use client'
import { Coupon } from "@prisma/client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { addCoupon, updateCoupon } from "@/app/admin/_actions/coupons";
import Image from "next/image";

export function AddCoupon ({coupon}:{coupon?:Coupon | null}){
    const [error, action] = useFormState(coupon == null ? addCoupon : updateCoupon.bind(null,coupon.id), {})

    return (
        <form action={action}>
            <div className='bg-gray-100 rounded-lg p-4 space-y-5'>
                <div className="space-y-2">
                    <label htmlFor="code">Coupon Code *</label>
                    <Input type="text" id="code" name="code" required defaultValue={coupon?.code}/>
                    {error.code && <div className='text-destructive'>{error.code}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="description">Coupon description *</label>
                    <Textarea name="description" id ="description" placeholder='description' required defaultValue={coupon?.description as string}/>
                    {error.description && <div className='text-destructive'>{error.description}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="maxDiscount">Max Discount *</label>
                    <Input type="number" id="maxDiscount" name="maxDiscount" required
                        defaultValue={coupon?.maxDiscount}/>
                    {error.maxDiscount && <div className='text-destructive'>{error.maxDiscount}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="minOrder">Min order value *</label>
                    <Input type="number" id="minOrder" name="minOrder" required
                        defaultValue={coupon?.maxDiscount}/>
                    {error.minOrderValue && <div className='text-destructive'>{error.minOrderValue}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="image">File</label>
                    <Input type="file" id="image" name="image"/>
                    {coupon != null && (<Image src={coupon?.image || ""} alt="coupon" height={250} width={250}/>)}
                    {error.image && <div className='text-destructive'>{error.image}</div>}
                </div>
            </div>
            <div className="flex gap-4 items-center my-8 justify-end">
                <Button size={"md"} variant={"secondary"}>
                    <Link href="/admin/coupons">Cancel</Link>
                </Button>
                <SubmitButton/>
            </div>
        </form>
    )
}


function SubmitButton(){
    const {pending} = useFormStatus()
    return (
        <Button type="submit" size={"md"} variant={"default"} disabled = {pending}>{pending ? "Saving..":"Save"}</Button>
    )
}