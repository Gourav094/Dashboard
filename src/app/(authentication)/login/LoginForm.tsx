
'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { handleGoogleSignin, handleSignin } from "../action";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "@/auth";

export default function LoginForm() {
    const router = useRouter()
    return (
        <div className={cn(`flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8`)}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={async(event) => { 
                       event.preventDefault()
                       const formData = new FormData(event.currentTarget);
                       const email = formData.get("email") as string
                       const password = formData.get("password") as string

                        console.log(email,password)
                        if(!email || !password){
                            return toast.error("please enter all the details")
                        }
                        const result = await handleSignin(email,password)

                        if(result?.error){
                            toast.error(result.error)
                        }else{
                            toast.success("Login successfully")
                            router.refresh()
                        }
                    }}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email"  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-2">Sign up</Link>
                </p>
                <form action={() => handleGoogleSignin()}>
                    <button type="submit" className="flex items-center justify-center gap-4 mt-4 border border-black w-full rounded-lg py-3 font-medium" >
                        <Image width={22} height={22} alt="google" src={"/google.png"}/>
                        Sign in with Google</button>
                </form>
            </div>
        </div>
    );
}
