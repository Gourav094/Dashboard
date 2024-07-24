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
        const user = await db.user.findUnique({where:{email:email}});

        if(!user){
            return {success:false,error:"User doesn't exist"}
        }

        await sendEmail(email); 
        return { success: true };
    } catch (err) {
        console.error("Error sending reset email:", err); 
        return { success: false, error: 'An unknown error occurred' }; 
    }
};

export const resetPassword = async(token:string,newPassword:string) => {
    console.log(token,newPassword)
    try{
        if(!token){
            throw new Error("Token is required!");
        }

        const user = await db.user.findUnique({where:{reset_password_token:token}});
        
        if(!user){
            return {success:false,error:"user doesn't exist"}
        }

        const currentDate = new Date();
        if (user.reset_password_expire_date && currentDate > user.reset_password_expire_date) {
            return { success: false, error: "Token has expired. Please reset your password again" };
        }

        const hashedPassword = await hash(newPassword,10) 

        await db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                reset_password_token: null, 
                reset_password_expire_date: null 
            }
        });

        return {success:true,message:"Password changed successfully"}
    }catch(err){
        return {success:false,error:"Unexpected error occurred. Please reset your password again."}
    }
}