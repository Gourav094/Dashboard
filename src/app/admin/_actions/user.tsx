'use server'
import db from "@/db/db"
import { checkAdmin } from "@/lib/checkAdmin"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"


export async function deleteUser(id:string){ 
    const isAdmin = await checkAdmin()

    if (isAdmin) {
        const deletedUser = await db.user.delete({ where: { id } });

        if (deletedUser) {
            revalidatePath("/");
            revalidatePath("/admin/users");
        } else {
            return notFound();
        }
    } else {
        throw new Error("Buddy! You don't have required permission to perform this action.");
    }
}