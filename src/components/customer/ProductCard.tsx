import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

type ProductCardProps = {
    id:string,
    image:string,
    name:string,
    priceInCents:number,
    description:string
}

const ProductCard = ({id,image,name,priceInCents,description}:ProductCardProps) => {
  return (
    <Card className="flex flex-wrap transition duration-200 w-full hover:cursor-pointer hover:scale-95 hover:duration-200">
        <div className='relative h-56 w-full'>
            <Image src={image} className='object-contain p-4'  alt={"productImage"} fill/>
        </div>
        <CardContent>
            <CardTitle className='text-base font-normal truncate webkit-line-clamp w-64'>
                {name}
            </CardTitle>
        </CardContent>
        <Button asChild size={"lg"} className='w-full'>
            <Link href={`/${id}/purchase`}>Purchase</Link>
        </Button>
    </Card>
  )
}

export default ProductCard
