import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { PostExcerpt } from "./PostExcerpt"
import { fetchPosts, selectAllPosts } from "./postsSlice"
import { ReactionButton } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"

export const PostList = () => {
  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()

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
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post}/>
    ))
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  )
  
}