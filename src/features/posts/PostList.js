import React from "react"
import { useSelector } from "react-redux"

export const PostList = () => {
  const posts = useSelector(state => state.posts)

  return (
    <div>
      {posts.map((post) => 
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0,100)}</p>
        </article>
      )}
    </div>
  )
  
}