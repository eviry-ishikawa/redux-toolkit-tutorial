import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'


export  function AddPostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if(title && content) {
      dispatch(postAdded({
        id: nanoid(),
        title,
        content
      }))
    }
    setTitle("")
    setContent("")
  }

  return (
    <div>
      <section>
        <form>
          <label>Post Title!</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label>Post Content</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>SavePost</button>
        </form>
      </section>
    </div>
  )
}
