import LoginForm from '@/app/(authentication)/login/LoginForm'
import { auth } from '@/auth'
import React from 'react'

const page = async() => {
  const session = await auth()
  console.log("user info from login file: ",session?.user)
  return (
    <LoginForm />
  )
}

export default page
 