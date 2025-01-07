import { configureStore } from '@reduxjs/toolkit';
import moviesSlice  from './moviesSlice';
import listMoviesSlice from './listFavoritesSlice';
export const store = configureStore({
  reducer: {
    searchMoviesSlice: moviesSlice,
    listMoviesSlice: listMoviesSlice

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;