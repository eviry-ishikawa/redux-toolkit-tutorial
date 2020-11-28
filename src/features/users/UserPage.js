import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectAllPosts } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export  function UserPage() {
  const { userId } = useParams()

  const user = useSelector(state => selectUserById(state, userId))

  const postsForuser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

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
