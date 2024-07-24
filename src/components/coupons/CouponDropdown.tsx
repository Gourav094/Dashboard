'use client'
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { useTransition } from "react"
import { deleteCoupon, updateCouponAvailability } from "@/app/admin/_actions/coupons"


export function ActiveToggleDropdown({id,isAvailable}:{id:string,isAvailable:boolean}) {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem disabled = {isPending} onClick = { () => {
            startTransition(async() => {
                await updateCouponAvailability(id,!isAvailable)
                router.refresh()
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
            await deleteCoupon(id)
            router.refresh()
        })
    }}>
        Delete
    </DropdownMenuItem>
}