'use client'
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { resetPassword } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function ResetPassword () {
    const [token,setToken] = useState("")
    const [error,setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        const url = window.location.search.split("=")[1];
        setToken(url)
        console.log("got token from the url: ",url)
    },[])

    const handleResetForm = async (event:any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newPassword = formData.get("password") as string
        const confirmPassword = formData.get("confirm-password") as string

        if(!newPassword){
            setError("Password should not be empty")
            return;
        }

        if(newPassword !== confirmPassword){
            setError("Password should be same!")
            return;
        }else{
            setError("")
        }
        const result = await resetPassword(token,newPassword);

        console.log(result)
        if(result.success === false){
            console.log("pta mhio",result?.error)
            toast.error(result?.error)
        }
        else{
            toast.success(result?.message)
            router.push("/login")
        }
    }

    return (
        <div className={cn(`flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8`)}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your new password</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-5" onSubmit={(e) => handleResetForm(e)}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirm-password" name="confirm-password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        {
                            error && <p className="text-red-600 text-sm mt-1">{error}</p>
                        }
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change Password</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}