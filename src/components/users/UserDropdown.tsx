import { deleteUser } from "@/app/admin/_actions/user";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DeleteDropdown({id} :{id:string}){
    const [isPending,startTransition] = useTransition() 
    const router = useRouter()
    return (
        <DropdownMenuItem disabled ={isPending} onClick={() => startTransition(async() => {
            await deleteUser(id)
            router.refresh()
        })}>
            Delete
        </DropdownMenuItem>
    )
}