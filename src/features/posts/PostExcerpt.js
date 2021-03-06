import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { selectPostById } from "./postsSlice"
import { ReactionButton } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"

export let PostExcerpt = ({postId}) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <div>
      <section className="posts-list">
        <article key={post.id} className="post-excerpt">
            <h1>
              {post.title}
            </h1>
          <p>
            Author:<PostAuthor userId={post.user}/>
          </p>
          <p>{post.content.substring(0,100)}</p>
          <p>
            <TimeAgo timestamp={post.date}/>
          </p>
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
          <p>
            <ReactionButton post={post}/>
          </p>
        </article>
      </section>
    </div>
  )}

PostExcerpt = React.memo(PostExcerpt)
