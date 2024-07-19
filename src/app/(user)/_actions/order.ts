"use server"

import db from "@/db/db"

export async function useOrderExists(email:string,productId:string){
    const orders = await db.order.findMany({where:{user:{email},productId}})
    if(orders === null){
        return null
    }
    return orders
}