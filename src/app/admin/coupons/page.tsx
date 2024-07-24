import CouponTable from '@/components/coupons/CouponTable';
import db from '@/db/db';
import React from 'react'

const getAllCoupons = async() => {
  const coupons = await db.coupon.findMany()
  return coupons;
}

const Coupons = async() => {
  const coupons = await getAllCoupons();
  return (
    <div>
      <h1 className="text-base md:text-xl font-medium">Coupons</h1>
      <CouponTable coupons = {coupons} />
    </div>
  )
}

export default Coupons