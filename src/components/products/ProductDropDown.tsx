'use client'
import { deleteProduct, updateAvailability } from "@/app/admin/_actions/products"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { useTransition } from "react"


export function ActiveToggleDropdown({id,isAvailable}:{id:string,isAvailable:boolean}) {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem disabled = {isPending} onClick = { () => {
            startTransition(async() => {
                const user = await updateAvailability(id,!isAvailable)
                router.refresh()
            })
        }}>
            {isAvailable ? "Out of stock":"Available"}
        </DropdownMenuItem>
    )
}

export function DeleteToggleDropdown({id,orders }: {id:string,orders:boolean}){
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={isPending || orders} onClick={() => {
        startTransition(async () => {
            await deleteProduct(id)
            router.refresh()
        })
    }}>
        Delete
    </DropdownMenuItem>
}