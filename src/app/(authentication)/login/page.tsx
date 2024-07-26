import LoginForm from '@/app/(authentication)/login/LoginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
  const session = await auth()
  if(session?.user){
    redirect("/")
  }
  return (
    <LoginForm />
  )
}

export default page
 