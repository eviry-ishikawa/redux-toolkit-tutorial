import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { selectPostById } from "./postsSlice"
import { ReactionButton } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"

export const SinglePostPage = () => {
  const { id: postId } = useParams()

  const post = useSelector(state => selectPostById(state, postId))

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
      <TimeAgo timestamp={post.date}/>
      <ReactionButton post={post}/>
      </article>
      <Link to={`/editPost/${postId}`}>Edit Post</Link>
    </section>
  )
}