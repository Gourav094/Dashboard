'use client'
import { deleteProduct, updateAvailability } from "@/app/admin/_actions/products"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { useTransition } from "react"
import { toast } from "sonner"


export function ActiveToggleDropdown({id,isAvailable}:{id:string,isAvailable:boolean}) {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem disabled = {isPending} onClick = { () => {
            startTransition(async() => {
                try{
                    await updateAvailability(id,!isAvailable)
                    router.refresh()
                }
                catch(error:any){
                    toast.error(error.message)
                }
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
            try{
                await deleteProduct(id)
                router.refresh()
                toast.error("User deleted successfully")
            }
            catch(error:any){
                toast.error(error.message)
            }
        })
    }}>
        Delete
    </DropdownMenuItem>
}