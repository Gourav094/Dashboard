'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { handleSignup } from "../action";
import { toast } from "sonner";

export default function SignupForm() {
    
    return (
        <div className={cn(`flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8`)}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-center text-2xl">Welcome!</h1>
                {/* <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2> */}
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit = {async(event) => {
                    event.preventDefault()
                    const formData = new FormData(event.currentTarget);
                    const userName = formData.get("username") as string;
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;
                    console.log(userName,email,password)
                    if(!email || !userName || !password){
                        toast.error("Please fill all the details")
                    }

                    const error = await handleSignup(userName,email,password);
                    
                    if(error){
                        toast.error(error);
                    }
                    else{
                        toast.success("Account created successfully")
                    }
                }}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">User name</label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text"  required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-2">Sign in</Link>
                </p>

            </div>
        </div>
    );
}
