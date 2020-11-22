import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id:"2", title: "Second Post", content:"more text" }
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers:{
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content){
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    },
    postUpdate(state, action){
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if(existingPost){
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdate } = postsSlice.actions

export default postsSlice.reducer