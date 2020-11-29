import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost, postAdded } from './postsSlice'


export  function AddPostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState("")

  const dispatch = useDispatch()

  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = async() => {
    if(title && content && userId) {
      try{
        setAddRequestStatus("pending")
        const resultAction = await dispatch(
          addNewPost({title, content, userId})
        )
        unwrapResult(resultAction)
        setTitle("")
        setContent("")
      } catch(err) {
        console.error("Failed")
      } finally {
        setAddRequestStatus("idle")
      }
    }
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
      <section>
      <h1>Add Post</h1>
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
