import { configureStore } from '@reduxjs/toolkit'
import priceReducer from './reducers/price'
import newsReducer from './reducers/news'

const store = configureStore({
  reducer: {
    price: priceReducer,
    news: newsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store