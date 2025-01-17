'use client'
import React, { FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js"
import { formatCurrency } from "@/lib/formatters"
import Image from 'next/image'
import { loadStripe } from "@stripe/stripe-js"

type CheckoutFormProps = {
    product: {
        id: string,
        name: string,
        image: string,
        price: number,
        description: string
    },
    clientSecret: string
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image
                        src={product.image}
                        fill
                        alt={product.name}
                        className="object-contain"
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
                </div>
            </div>
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Form price={product.price} productId={product.id} />
            </Elements>
        </div>
    )
}
const Form = ({ price, productId }: { price: number, productId: string }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (stripe == null || elements == null || email == null) return

        setIsLoading(true)

        stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase`,
                },
            })
            .then(({ error }) => {
                console.log(error)
                if (error.type === "card_error" || error.type === "validation_error") {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage(error.message)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && (
                        <CardDescription className="text-destructive">
                            {errorMessage}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div className="mt-4">
                        <LinkAuthenticationElement
                            onChange={e => setEmail(e.value.email)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        disabled={stripe == null || elements == null || isLoading}
                    >
                        {isLoading
                            ? "Purchasing..."
                            : `Purchase - ${formatCurrency(price)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}