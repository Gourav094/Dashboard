import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      Here products will shown for clients
      visit admin page
      <Link href={"/admin/dashboard"}>click here</Link>
    </div>
  )
}

export default page
