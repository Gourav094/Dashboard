import LoginForm from '@/app/(authentication)/login/LoginForm'
import { auth } from '@/auth'
import React from 'react'

const page = async() => {
  const session = await auth()
  console.log("user info: ",session)
  return (
    <LoginForm />
  )
}

export default page
 