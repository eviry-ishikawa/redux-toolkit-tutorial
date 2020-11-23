import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"

export const PostList = () => {
  const posts = useSelector(state => state.posts)

  return (
    <div>
      {posts.map((post) => 
        <article key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <p>
            Author:<PostAuthor userId={post.user}/>
          </p>
          <p>{post.content.substring(0,100)}</p>
        </article>
      )}
    </div>
  )
  
}