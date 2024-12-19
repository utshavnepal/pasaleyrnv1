import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from './services/userAuthApi'
import userReducer from './features/userSlice'
import authReducer from './features/authSlice'

import walletSlice from './features/walletSlice'


export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user: userReducer,
    auth: authReducer,
    wallet: walletSlice,
   
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
},
)
setupListeners(store.dispatch)