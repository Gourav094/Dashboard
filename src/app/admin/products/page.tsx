import ProductList from '@/components/products/ProductList'
import { ProductsTableSkeleton } from '@/components/skeletons'
import db from '@/db/db'
import { Suspense } from 'react'

async function getProducts() {
  const products = await db.product.findMany({
    select:{
      id:true,
      isAvailable:true,
      name:true,
      description:true,
      priceInCents:true,
      _count : {select:{
        order: true
      }}
    }
  })
  return products
}

const Products = async() => {

  const products = await getProducts()

  return (
    <>
      <Suspense fallback={<ProductsTableSkeleton/>}>
        <ProductList products = {products}/>
      </Suspense>
    </>
  )
}

export default Products