'use client'
import { cn } from "@/lib/utils";
import { sendResetEmail } from "../action";
import { useState, useTransition } from "react";
import { MdDone } from "react-icons/md";
import Link from "next/link";


export default function ForgotPassword() {
    const [isPending, startTransition] = useTransition();
    const [resetSuccess, setResetSuccess] = useState(false);

    return (
        <div className={cn(`flex min-h-full w-full flex-col justify-center items-center px-6 py-12 lg:px-8`)}>
            {resetSuccess ? (
            <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password ?</h2>
                <h5>Please enter your registered email.</h5>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={async(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get("email") as string
                    startTransition(async() => {
                        const result = await sendResetEmail(email);
                        if(result.success){
                            setResetSuccess(true);
                        }
                    })
                }}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {isPending ? "Sending..":"Submit"}
                        </button>
                    </div>
                </form>
            </div>
            </>) : (
                    <div className='rounded-xl bg-gray-50 shadow py-10 px-4 text-center'>
                        <div className="flex items-center justify-center">
                            <MdDone className="text-green-700 size-12 "/>
                        </div>
                        <h3 className="px-4 py-2 text-xl font-medium">Complete your password reset request</h3>
                        <p className=' py-2 px-4 text-center text-base trucate'>We have sent you the reset password token to your email id.</p>
                        <button className=" gap-4 mt-4 border border-black rounded-lg py-2 px-4 font-medium" >
                            <Link href={"/login"}>
                            Back to login
                            </Link>
                        </button>
                    </div>
            )}
        </div>
    )
}