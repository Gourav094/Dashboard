import ProductList from '@/components/products/ProductList'
import db from '@/db/db'

async function getProducts() {
  const products = await db.product.findMany({
    select:{
      id:true,
      isAvailable:true,
      name:true,
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
      <ProductList products = {products}/>
  )
}

export default Products