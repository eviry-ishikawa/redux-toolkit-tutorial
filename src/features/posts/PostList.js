import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { ReactionButton } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"

export const PostList = () => {
  const posts = useSelector(state => state.posts)

  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

  return (
    <div>
      {orderedPosts.map((post) => 
        <article key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <p>
            Author:<PostAuthor userId={post.user}/>
          </p>
          <p>{post.content.substring(0,100)}</p>
          <p>
            <TimeAgo timestamp={post.date}/>
          </p>
          <p>
            <ReactionButton post={post}/>
          </p>
        </article>
      )}
    </div>
  )
  
}