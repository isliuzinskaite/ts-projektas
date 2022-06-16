import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import counterReducer from './counterSlice';
import { locationApi } from './services/location-api';
import { regionApi } from './services/region-api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [regionApi.reducerPath]: regionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(locationApi.middleware)
    .concat(regionApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
