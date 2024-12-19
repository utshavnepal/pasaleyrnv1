import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  rewards: 0,
  balance: "0",
  id:"",
  points:0
}
export const walletSlice = createSlice({
  name: 'wallet_info',
  initialState,
  reducers: {
    setWalletInfo: (state, action) => {
      state.rewards = action.payload.rewards
      state.balance = action.payload.balance
      state.id = action.payload.id
      state.points = action.payload.points
    },
    unSetWalletInfo: (state, action) => {
        state.rewards = action.payload.rewards
      state.balance = action.payload.balance
      state.id = action.payload.id
      state.points = action.payload.points
    },
  }
})

export const { setWalletInfo, unSetWalletInfo } = walletSlice.actions
export default walletSlice.reducer