"use server"
import db from "@/db/db"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { checkAdmin } from "@/lib/checkAdmin"

const fileSchema = z.instanceof(File)
  .refine(file => file.size === 0 || file.type.startsWith('image/'), { message: "File must be an image" });

const addSchema = z.object({
    code: z.string().min(3),
    description: z.string().optional(),
    maxDiscount: z.coerce.number().int().min(1),
    minOrderValue: z.coerce.number().int().min(1),
    image: fileSchema.optional()
});

export async function addCoupon(preState: unknown, formData: FormData) {
    const isAdmin = await checkAdmin()

    if(!isAdmin){
        return {code: "",description: "",maxDiscount:"",minOrderValue:"",image :"You don't have required persmission to perform this action"}
    }

    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        console.log("getting error in coupon",result.error)
        return result.error.formErrors.fieldErrors
    }

    const coupon = result.data
    console.log("coupon data: ",coupon)
    let filePath;
    if(coupon.image){
        await fs.mkdir("public/coupons", { recursive: true })
        filePath = `/coupons/${crypto.randomUUID()}-${coupon?.image?.name}`
        await fs.writeFile(`public${filePath}`, Buffer.from(await coupon.image.arrayBuffer()))
    }

    await db.coupon.create({
        data: {
            code:coupon.code,
            description:coupon.description,
            minOrderValue:coupon.minOrderValue,
            maxDiscount: coupon.maxDiscount,
            image:filePath,
            isAvailable: true,
        }
    })
    revalidatePath("/")
    revalidatePath("/coupons")
    redirect("/admin/coupons")
}
const updateSchema = addSchema.extend({})

export async function updateCoupon(id: string, preState: unknown, formData: FormData) {
    const isAdmin = await checkAdmin()

    if(!isAdmin){
        return {code: "",description: "",maxDiscount:"",minOrderValue:"",image :"You don't have required persmission to perform this action"}
    }

    const result = updateSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const coupon = await db.coupon.findUnique({ where: { id } })

    if (coupon === null) {
        return notFound()
    }

    let filePath = coupon.image
    if (data.image != null && data.image.size > 0) {
        if(coupon.image){
            await fs.unlink(`public${coupon.image}`)
        }
        filePath = `/coupons/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${filePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await db.coupon.update({
        where: { id },
        data: {
            code:data.code,
            description:data.description,
            minOrderValue:data.minOrderValue,
            maxDiscount: data.maxDiscount,
            image:filePath,
            isAvailable: true,
        }
    })
    revalidatePath("/")
    revalidatePath("/coupons")
    redirect("/admin/coupons")
}

export async function updateCouponAvailability(id: string, isAvailable: boolean) {
    const isAdmin = await checkAdmin()

    if(!isAdmin){
        throw new Error("Buddy! You don't have required permission to perform this action.");
    }

    await db.coupon.update({ where: { id }, data: { isAvailable } })
}

export async function deleteCoupon(id: string) {
    const isAdmin = await checkAdmin()

    if(!isAdmin){
        throw new Error("Buddy! You don't have required permission to perform this action.");
    }

    const coupon = await db.coupon.delete({ where: { id } })
    if (coupon === null) {
        return notFound()
    }
    // await fs.unlink(`public${coupon.image}`)

}