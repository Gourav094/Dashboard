"use server"
import { signIn } from "@/auth";
import db from "@/db/db";
import {hash} from "bcryptjs"
import { redirect } from "next/navigation";

export const handleSignin = async(email:string,password:string) => {
    try {
        await signIn('credentials', {
            email,
            password,
            redirect:false
        });
    } catch (error) {
        const err = (error as any)?.cause[0]
        return { success: false, error: err };
    }
   
}

export const handleSignup = async(userName:string,email:string,password:string) => {
    const user = await db.user.findUnique({where : {email}})
    if(user){
        return "User already exist"
    }

    const username = user ? null : await db.user.findUnique({ where: { userName: userName } });

    if(username){
        return `This username is not available. please try something else`
    }

    const hashedPassword = await hash(password,10) 

    await db.user.create({
        data:{
            userName,
            email,
            password: hashedPassword
        }
    })

    redirect("/login")
}


export const handleGoogleSignin = async() => {
    console.log("calling google sign in method")
    await signIn("google")
    // try{
    // }
    // catch(err:any) {
    //     console.log( err)
    // }
}