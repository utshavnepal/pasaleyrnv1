import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  phoneno: "",
  name: "",
  id:""
}
export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.phoneno = action.payload.phoneno
      state.name = action.payload.name
      state.id = action.payload.id
    },
    unSetUserInfo: (state, action) => {
      state.phoneno = action.payload.phoneno
      state.name = action.payload.name
      state.id = action.payload.id
    },
  }
})

export const { setUserInfo, unSetUserInfo } = userSlice.actions
export default userSlice.reducer