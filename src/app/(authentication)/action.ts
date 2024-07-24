"use server"
import { signIn } from "@/auth";
import db from "@/db/db";
import { sendEmail } from "@/mailer";
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
        const err = (error as any)?.cause
        if(err) {
            return {error:err[0]}
        }
        return { success: false, error: "Unexpected error occured" };
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
    await signIn("google")
}

interface SendResetEmailResponse {
    success: boolean;
    error?: string; 
}

export const sendResetEmail = async (email: string): Promise<SendResetEmailResponse> => {
    try {
        await sendEmail(email); 
        return { success: true };
    } catch (err) {
        console.error("Error sending reset email:", err); 
        return { success: false, error: 'An unknown error occurred' }; 
    }
};