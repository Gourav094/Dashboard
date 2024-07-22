import NextAuth, { AuthError } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import db from "./db/db"
import { compare } from "bcryptjs"
import { tree } from "next/dist/build/templates/app-page"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
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
        
        if(!user || !user.password){
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
  },
  callbacks:{
    signIn: async({user,account}) => {
      if(account?.provider === "google"){
        try{
          const {email,name,id} = user;
          if(!email || !name){
            return false;
          }
          const userExist = await db.user.findFirst({
            where:{
              OR:[
                {email},
                {userName:name}
              ]
            }
          })
          console.log("user existance info: ",userExist)
          if(userExist != null){
            return true;
          }else{
            await db.user.create({
              data:{
                userName:name as string,
                email,
                googleId:id,
              }
            })
          }
          return true;
        }
        catch(error:any){
          throw new AuthError(error)
        }
      }
      return false;
    },
  },
})