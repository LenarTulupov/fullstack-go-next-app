import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'
import filtersReducer from './filters/filtersSlice'

export const store = configureStore({
  reducer: {
    product: productsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;