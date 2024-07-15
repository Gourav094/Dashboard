import Breadcrumb from '@/components/products/Breadcrumb'
import ProductForm from '@/components/products/ProductForm'
import React from 'react'

const page = () => {
  return (
    <div>
        <Breadcrumb breadcrumbs={[
            {label:"product",href: "/products",active:false},
            {label:"add",href:"/products/new",active:true}
        ]}/>
        <ProductForm/>
    </div>
  )
}

export default page