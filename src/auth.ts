import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import db from "./db/db"
import { compare } from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }),
    CredentialProvider({
      name:"credentials",
      credentials:{
        email:{type:"email"},
        password:{type:"password"}
      },
      authorize: async(credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if(!email || !password){
          throw new Error ("Please fill all the details",{cause:["Please fill all the details"]})
        } 
        const user = await db.user.findUnique({where: {email}})
        
        if(!user){
          throw new Error ("Email doesn't exist",{cause:["Email doesn't exist"]})
        }

        const  isMatch = await compare(password,user.password);

        if (!isMatch) {
          throw new Error ("Invalid password",{cause:["Invalid Password"]})
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: "/login",
  }
})