import CouponTable from '@/components/coupons/CouponTable';
import { CouponsTableSkeleton } from '@/components/skeletons';
import db from '@/db/db';
import React, { Suspense } from 'react'

const getAllCoupons = async() => {
  const coupons = await db.coupon.findMany()
  return coupons;
}

const Coupons = async() => {
  const coupons = await getAllCoupons();
  return (
    <div>
      <h1 className="text-base md:text-xl font-medium">Coupons</h1>
      <Suspense fallback={<CouponsTableSkeleton/>}>
        <CouponTable coupons = {coupons} />
      </Suspense>
    </div>
  )
}

export default Coupons