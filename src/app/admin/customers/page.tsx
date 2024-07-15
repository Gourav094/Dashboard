import UserList from '@/components/users/UsersList'
import db from '@/db/db'
import React from 'react'

const getUsers = async() => {
  const users = await db.user.findMany({
    select:{
      id:true,
      email:true,
      userName:true,
      order:{select:{
        soldPrice:true
      }}
    },
    orderBy:{createdAt:"desc"}
  })
  return users;
}

const Customers = async() => {
  // const users = await getUsers()
  const users = [
    {
      id:"1",
      email:"garggourav012@gmail.com",
      userName:"gourav01",
      order:[
        {
          soldPrice:1000000
        }
      ]
    }
  ]
  return (
    <>
      <h2 className="text-xl font-medium">Users</h2>
      <UserList users = {users} />
    </>
  )
}

export default Customers