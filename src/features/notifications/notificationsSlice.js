import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  //  createAsyncThunkの第二引数にはいろいろ取れて、今回はgetStateを使用して現在のsteteを取得している
  async(_,{ getState }) => {
    console.log(getState())
    const allNotifications = selectAllNotifications(getState())
    // ここいまいちわからない
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ""
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)

export const notificationsSlice = createSlice({
  name:"notifications",
  initialState:[],
  reducers:{},
  extraReducers:{
    [fetchNotifications.fulfilled]: (state, action) =>{
      state.push(...action.payload)
      state.sort((a,b) => b.date.localeCompare(a.date))
    }
  }
})

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications