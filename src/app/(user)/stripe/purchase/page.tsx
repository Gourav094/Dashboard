import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPurchase({
    searchParams,
}: {
    searchParams: { payment_intent: string }
}) {
    const session = await auth()
    const userId = session?.user?.id
    
    const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent
    )
    if (paymentIntent.metadata.productId == null) return notFound()
    
    const product = await db.product.findUnique({
        where: { id: paymentIntent.metadata.productId },
    })

    console.log("message from page/successPurchase: ",userId)
    if (product == null || !userId) return notFound()

    const isSuccess = paymentIntent.status === "succeeded"

    
    if(isSuccess){
        const existingOrder = await db.order.findFirst({
            where: {
                userId: userId,
                productId: paymentIntent.metadata.productId,
                soldPrice: paymentIntent.amount
            },
        })

        if (!existingOrder) {
            await db.order.create({
                data: {
                    soldPrice: paymentIntent.amount,
                    userId: userId,
                    productId: paymentIntent.metadata.productId
                }
            })
        }
    }

    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <h1 className="text-4xl font-bold">
                {isSuccess ? "Success!" : "Error!"}
            </h1>
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image
                        src={product.image}
                        fill
                        alt={product.name}
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-lg">
                        {formatCurrency(product.price)}
                    </div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>
                    <Button className="mt-4" size="lg" asChild>
                        {isSuccess ? (
                            <a
                                href={"#"}
                            >
                                Download
                            </a>
                        ) : (
                            <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}