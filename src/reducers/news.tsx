import { createSlice } from '@reduxjs/toolkit'

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: null,
    fetching: false,
  },
  reducers: {
    startFetchNews: (state) => {
      state.fetching = true
    },
    successFetchNews: (state, action) => {
      state.fetching = false
      state.data = action.payload.data
    },
    failFetchNews: (state) => {
      state.fetching = false
      state.data = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { startFetchNews, successFetchNews, failFetchNews } = newsSlice.actions

export default newsSlice.reducer