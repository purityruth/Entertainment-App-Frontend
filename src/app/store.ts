import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { registerUserApi } from './api/apiRegisterUserSlice';
import { openWeatherApi } from './api/apiOpenWeatherSlice';
import { cmsApi } from './api/apiContentManagementSlice';
import { usersApi } from './api/apiAuthorizationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from './api/apiSlice';
import { PasswordResetApi } from './api/apiPasswordResetSlice';
const persistAuthConfig = {
  key: 'root',
  storage,
}
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);



export const store = configureStore({

  reducer: {
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [openWeatherApi.reducerPath]: openWeatherApi.reducer,
    [PasswordResetApi.reducerPath]: PasswordResetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    auth: authReducer,
    persistAuth: persistedAuthReducer,
   
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat([ 
    registerUserApi.middleware, 
    openWeatherApi.middleware, 
    usersApi.middleware, 
    apiSlice.middleware, 
    cmsApi.middleware
  ]),
  devTools:process.env.NODE_ENV !=='PRODUCTION' ? true : false,
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
