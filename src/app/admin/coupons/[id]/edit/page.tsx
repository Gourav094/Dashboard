import { AddCoupon } from "@/components/coupons/AddCouponForm"
import Breadcrumb from "@/components/Breadcrumb"
import db from "@/db/db"

export default async function EditProduct({params:{id}}:{params:{id:string}}){
    const coupon = await db.coupon.findUnique({where:{id}})
    
    return (
        <div>
            <Breadcrumb breadcrumbs={[
                {label: "Coupons",href: "/admin/coupons",active: false},
                {label: "Edit",href: `/admin/coupons/edit/${id}`,active: true}
            ]}/>
            <AddCoupon coupon = {coupon}/>
        </div>
    )
}