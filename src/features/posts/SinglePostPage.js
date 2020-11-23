import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"

export const SinglePostPage = () => {
  const { id: postId } = useParams()

  const post = useSelector(state => 
    state.posts.find(post => post.id === postId)  
  )

  if(!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <PostAuthor userId={post.user}/>
      </article>
      <Link to={`/editPost/${postId}`}>Edit Post</Link>
    </section>
  )
}