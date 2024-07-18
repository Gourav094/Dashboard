import ProductCard from '@/components/customer/ProductCard'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function getPopularProducts() {
  return db.product.findMany({
    orderBy:{
      order:{
        _count:"desc"
      }
    }
  })
}

function getNewestProducts(){
  return db.product.findMany({
    orderBy:{
      createdAt:"desc"
    }
  })
}

function getAllProducts(){
  return db.product.findMany()
}

export default async function Products (){
  const allproducts = await getAllProducts()
  const newestProducts = await getNewestProducts()
  const popularProducts = await getPopularProducts()
  return (
    <>
      <div className='max-w-7xl mx-auto'>
          <ProductGrid title="All products" allproducts = {allproducts}/>
      </div>
    </>
  )
}

type ProductGridProps = {
  title:string,
  allproducts: Product[]
}

export function ProductGrid({title,allproducts} : ProductGridProps){
  return (
    <div className='space-y-4'>
        <div className="flex gap-4">
          <h2 className='font-medium text-xl'>{title}</h2>
          <Button variant={"outline"} asChild>
            <Link href={"/"}>
            <span>view all</span>
            <ArrowRight className="size-4"/>
            </Link>
          </Button>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {
              allproducts.map(product => (
                <ProductCard key={product.id} {...product}/>
              ))
            }
        </div>
    </div>
  )
}