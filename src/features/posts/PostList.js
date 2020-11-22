import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const PostList = () => {
  const posts = useSelector(state => state.posts)

  return (
    <div>
      {posts.map((post) => 
        <article key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <p>{post.content.substring(0,100)}</p>
        </article>
      )}
    </div>
  )
  
}