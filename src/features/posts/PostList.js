import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { PostExcerpt } from "./PostExcerpt"
import { fetchPosts, selectAllPosts, selectPostIds } from "./postsSlice"
import { ReactionButton } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"

export const PostList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if(postStatus === "idle") {
      dispatch(fetchPosts())
    }
  },[postStatus, dispatch])

  let content

  if(postStatus === "loading"){
    content = <div className="loader">Loading...</div>
  } else if ( postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId}/>
    ))
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
  
}