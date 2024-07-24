"use server"
import db from "@/db/db"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File, { message: "required" })
    .refine(file => file.size === 0 || file.type.startsWith('image/'), { message: "File must be an image" });

const addSchema = z.object({
    name: z.string().min(1),
    code: z.string().min(5),
    description: z.string().optional(),
    maxDiscount: z.coerce.number().int().min(1),
    minOrderValue: z.coerce.number().int().min(1),
    image: fileSchema.optional().refine(file => file == null || file.size > 0, 'required'),
});

export async function addCoupon(preState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const coupon = result.data

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
    const result = updateSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(result?.error?.formErrors?.fieldErrors, Object.fromEntries(formData.entries()))
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
        await fs.unlink(`public${coupon.image}`)
        filePath = `/coupons/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${filePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await db.coupon.update({
        where: { id },
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

export async function updateCouponAvailability(id: string, isAvailable: boolean) {
    await db.coupon.update({ where: { id }, data: { isAvailable } })
}

export async function deleteCoupon(id: string) {
    const coupon = await db.coupon.delete({ where: { id } })
    if (coupon === null) {
        return notFound()
    }
    // await fs.unlink(`public${coupon.image}`)

}