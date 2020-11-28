import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectAllUser } from "./usersSlice"

export const UsersList = () => {
  const users = useSelector(selectAllUser)

  const renderedUsers = users.map(user => (
    <li key={user.id}> 
    <Link to={`/users/${user.id}`}>
      {user.name}
    </Link>
    </li>
  ))

  return(
    <section>
      <h2>Users</h2>
       {renderedUsers}
    </section>
  )
}