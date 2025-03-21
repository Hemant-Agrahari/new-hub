import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserType from '@/types/user'

interface IGame {
  gameUrl: string
  tab: string
  gameProvider: string
  activeId: string
  divSettingTabAPI: string
}

const initialState: IGame = {
  gameUrl: '',
  tab: 'all games',
  activeId: 'divOne',
  gameProvider: 'All Games',
  divSettingTabAPI: 'AllGames',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTab: (state: any, action: any) => {
      state.tab = action.payload.tab
      state.activeId = action.payload.activeId
      state.divSettingTabAPI = action.payload.divSettingTabAPI
    },
    setGameUrl: (state: any, action: PayloadAction<string>) => {
      state.gameUrl = action.payload
    },
    setGameProvider: (state: any, action: any) => {
      state.gameProvider = action.payload
    },
  },
})

export const { setTab, setGameUrl, setGameProvider } = gameSlice.actions

export default gameSlice.reducer
