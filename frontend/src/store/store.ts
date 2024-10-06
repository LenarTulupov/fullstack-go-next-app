import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'
import filtersReducer from './filters/filtersSlice'
import favoriteReducer from './favorite-button/favoriteButtonSlice'

export const store = configureStore({
  reducer: {
    product: productsReducer,
    filters: filtersReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;