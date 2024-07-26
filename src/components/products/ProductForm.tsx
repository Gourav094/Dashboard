"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { formatCurrency } from '@/lib/formatters'
import { Textarea } from '../ui/textarea'
import Link from 'next/link'
import { Button } from '../ui/button'
import { addProduct, updateProduct } from '@/app/admin/_actions/products'
import { useFormState, useFormStatus } from 'react-dom'
import { Product } from '@prisma/client'
import Image from 'next/image'

const ProductForm = ({product}:{product?:Product | null}) => {
    const [priceInCents,setPriceInCents] = useState<number | undefined>(product?.priceInCents)
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null,product.id), {})
    
    return (
        <form action={action}>
            <div className='bg-gray-100 rounded-lg p-4 space-y-5'>
                <div className="space-y-2">
                    <label htmlFor="name">Product name</label>
                    <Input type="text" id="name" name="name" required defaultValue={product?.name}/>
                    {error && error.name && <div className='text-destructive'>{error.name}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="description">Product description</label>
                    <Textarea name="description" id ="description" placeholder='description' required defaultValue={product?.description}/>
                    {error && error.description && <div className='text-destructive'>{error.description}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="category">Product category</label>
                    <Input type="text" name="category" id ="category" placeholder='category' required defaultValue={product?.category}/>
                    {error && error.category && <div className='text-destructive'>{error.category}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="priceInCents">Price in cents</label>
                    <Input type="number" id="priceInCents" name="priceInCents" required
                        value={priceInCents}
                        onChange={e => setPriceInCents(Number(e.target.value) || undefined)} />
                    <div className="text-muted-foreground">
                        {formatCurrency((priceInCents || 0) / 100)}
                    </div>
                    {error && error.priceInCents && <div className='text-destructive'>{error.priceInCents}</div>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="image">File</label>
                    <Input type="file" id="image" name="image" required = {product == null}/>
                    {product != null && (<Image src={product?.image|| ""} alt="product" height={250} width={250}/>)}
                    {error && error.image && <div className='text-destructive'>{error.image}</div>}
                </div>
            </div>
            <div className="flex gap-4 items-center my-8 justify-end">
                <Button size={"md"} variant={"secondary"}>
                    <Link href="/admin/products">Cancel</Link>
                </Button>
                <SubmitButton/>
            </div>
        </form>
    )
}

export default ProductForm


function SubmitButton(){
    const {pending} = useFormStatus()
    return (
        <Button type="submit" size={"md"} variant={"default"} disabled = {pending}>{pending ? "Saving..":"Save"}</Button>
    )
}