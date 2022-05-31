import { createSlice } from '@reduxjs/toolkit'

export const priceSlice = createSlice({
  name: 'price',
  initialState: {
    data: [],
    curPrice: { price: 0 },
    fetching: false,
    graphDays: 2
  },
  reducers: {
    startFetchPrice: (state) => {
      state.fetching = true
    },
    successFetchPrice: (state, action) => {
      state.fetching = false
      state.data = action.payload.data
    },
    failFetchPrice: (state) => {
      state.fetching = false
      state.data = []
    },
    updateGraphDays: (state, action) => {
      state.graphDays = action.payload.graphDays
    },
    setCurPrice: (state, action) => {
      state.curPrice = action.payload.curPrice
    },
  },
})

// Action creators are generated for each case reducer function
export const { startFetchPrice, successFetchPrice, failFetchPrice, updateGraphDays, setCurPrice } = priceSlice.actions

export default priceSlice.reducer