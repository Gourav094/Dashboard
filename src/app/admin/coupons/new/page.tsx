import { AddCoupon } from '@/components/coupons/AddCouponForm'
import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'

const page = () => {
  return (
    <div>
        <Breadcrumb breadcrumbs={[
            {label:"Coupons",href: "/admin/coupons",active:false},
            {label:"add",href:"/coupons/new",active:true}
        ]}/>
        <AddCoupon/>
    </div>
  )
}

export default page