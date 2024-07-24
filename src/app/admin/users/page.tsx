import {  UsersTableSkeleton } from '@/components/skeletons'
import UserList from '@/components/users/UsersList'
import db from '@/db/db'
import React, { Suspense } from 'react'

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

const Users = async() => {
  const users = await getUsers()
  return (
    <>
      <h2 className="text-xl font-medium">Users</h2>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UserList users = {users} />
      </Suspense>
    </>
  )
}

export default Users