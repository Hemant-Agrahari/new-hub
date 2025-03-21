import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BTState {
  btInstance: any | null
  refreshCmp: boolean
}

const initialState: BTState = {
  btInstance: null,
  refreshCmp: false,
}

const btSlice = createSlice({
  name: 'bt',
  initialState,
  reducers: {
    setBTInstance(state, action: PayloadAction<any>) {
      state.btInstance = action.payload
    },
    clearBTInstance(state) {
      state.btInstance = null
    },
    refreshComponent(state) {
      state.refreshCmp = !state.refreshCmp
    },
  },
})

export const { setBTInstance, clearBTInstance, refreshComponent } =
  btSlice.actions
export default btSlice.reducer
