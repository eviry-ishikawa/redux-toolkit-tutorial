import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export  function UserPage() {
  const { userId } = useParams()

  const user = useSelector(state => selectUserById(state, userId))

  const postsForuser = useSelector(state => selectPostsByUser(state, userId))

  const postTitles = postsForuser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </div>
  )
}
