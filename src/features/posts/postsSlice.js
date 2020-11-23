import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!", user:"0", date:"2020-11-20T02:06:06.764Z",reactions: { thumbsUp:0, hooray: 0,heart:0,rocket:0,eyes:0 } },
  { id: "2", title: "Second Post", content:"more text", user:"1", date: "2020-11-21T02:06:06.764Z",reactions: { thumbsUp:0, hooray: 0,heart:0,rocket:0,eyes:0 } }
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers:{
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId){
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: { thumbsUp:0, hooray: 0,heart:0,rocket:0,eyes:0}
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
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if(existingPost){
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdate, reactionAdded } = postsSlice.actions

export default postsSlice.reducer