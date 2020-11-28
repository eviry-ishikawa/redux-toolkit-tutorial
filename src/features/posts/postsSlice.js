import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { client } from "../../api/client"

const postsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () => {
  const response = await client.get("/fakeApi/posts")
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
  }
)


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers:{
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
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
      const existingPost = state.entities[id]
      if(existingPost){
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if(existingPost){
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded"
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: postsAdapter.addOne
  }
})

export const { postAdded, postUpdate, reactionAdded } = postsSlice.actions

// export const selectAllPosts = state => state.posts.posts

// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id = postId)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export default postsSlice.reducer
