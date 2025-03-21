import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userReducer'
import gamesReducer from './games/gamesReducer'
import btSlice from './btSlice/btSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    bt: btSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
