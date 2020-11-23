import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'


export  function AddPostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if(title && content) {
      dispatch(postAdded(title,content, userId))
    }
    setTitle("")
    setContent("")
  }

  const canSave = () => {
    return Boolean(title) && Boolean(content) && Boolean(userId)
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <div>
      <h1>Add Post</h1>
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
          <label>Author:</label>
          <select value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>SavePost</button>
        </form>
      </section>
    </div>
  )
}
