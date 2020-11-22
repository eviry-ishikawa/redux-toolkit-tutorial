import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, postUpdate } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useHistory, useParams } from 'react-router-dom'


export  function EditPostForm() {
  const { id } = useParams()
  const history = useHistory()

  const post = useSelector(state => state.posts.find((post) => post.id === id))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if(title && content) {
      dispatch(postUpdate({
        id,
        title,
        content
      }))
    }
    history.push(`/posts/${id}`)
  }

  return (
    <div>
      <section>
        <form>
          <label>Edit Title!</label>
          <input
            type="text"
            id="editTitle"
            name="editTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label>Edit Content</label>
          <textarea
            id="editContent"
            name="editContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>SavePost</button>
        </form>
      </section>
    </div>
  )
}
