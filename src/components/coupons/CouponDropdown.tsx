'use client'
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { useTransition } from "react"
import { deleteCoupon, updateCouponAvailability } from "@/app/admin/_actions/coupons"
import { toast } from "sonner"


export function ActiveToggleDropdown({id,isAvailable}:{id:string,isAvailable:boolean}) {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem disabled = {isPending} onClick = { () => {
            startTransition(async() => {
                try{
                    await updateCouponAvailability(id,!isAvailable)
                    router.refresh()
                }
                catch(error:any){
                    toast.error(error.message)
                }
            })
        }}>
            {isAvailable ? "Inactive":"Active"}
        </DropdownMenuItem>
    )
}

export function DeleteToggleDropdown({id }: {id:string}){
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={isPending} onClick={() => {
        startTransition(async () => {
            try{
                await deleteCoupon(id)
                router.refresh()
                toast.success("Coupon deleted successfully!")
            }
            catch(error:any){
                toast.error(error.message)
            }
        })
    }}>
        Delete
    </DropdownMenuItem>
}