"use server"
import db from "@/db/db"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File,{message:"required"})
.refine(file => file.size === 0 || file.type.startsWith('image/'), { message: "File must be an image" });

const addSchema = z.object({
    name : z.string().min(1),
    description: z.string().min(1),
    priceInCents : z.coerce.number().int().min(1),
    image : fileSchema.refine(file => file.size > 0,'required')
})

export async function addProduct(preState:unknown,formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(Object.fromEntries(formData.entries()))
    if(result.success === false){
        return result.error.formErrors.fieldErrors 
    }

    const product = result.data

    await fs.mkdir("public/products",{recursive : true})
    const filePath = `/products/${crypto.randomUUID()}-${product.image.name}`
    await fs.writeFile(`public${filePath}`, Buffer.from(await product.image.arrayBuffer()))

    await db.product.create({
        data:{
            name: product.name,
            description: product.description,
            priceInCents: product.priceInCents,
            isAvailable: true,
            image: filePath
        }
    })
    revalidatePath("/")
    revalidatePath("/products")
    redirect("/admin/products")
}
const updateSchema = addSchema.extend({
    image: fileSchema.optional()
})
export async function updateProduct(id:string,preState:unknown,formData: FormData) {
    const result = updateSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(result?.error?.formErrors?.fieldErrors,Object.fromEntries(formData.entries()))
    if(result.success === false){
        return result.error.formErrors.fieldErrors 
    }

    const data = result.data
    const product = await db.product.findUnique({where:{id}})

    if(product === null){
        return notFound()
    }

    let filePath = product.image
    if(data.image != null && data.image.size > 0){
        await fs.unlink(`public${product.image}`)
        filePath = `/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${filePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await db.product.update({
        where:{id},
        data:{
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            isAvailable: true,
            image: filePath
        }
    })
    revalidatePath("/")
    revalidatePath("/products")
    redirect("/admin/products")
}

export async function updateAvailability(id:string, isAvailable:boolean){
    await db.product.update({where: {id}, data:{isAvailable}})
    revalidatePath("/")
    revalidatePath("/products")
}

export async function deleteProduct(id: string){
    const product = await db.product.delete({where: {id}})
    if(product === null){
        return notFound()
    }
    await fs.unlink(`public${product.image}`)

    revalidatePath("/")
    revalidatePath("/products")
}