  import { configureStore } from '@reduxjs/toolkit'
  import filtersReducer from './filters/filtersSlice'
  import favoriteReducer from './favorite-button/favoriteButtonSlice'
  import productPopupStateReducer from './productPopup/productPopupSlice'
  import sizesPopupStateReducer from './sizesPopup/sizesPopupSlice'
  import productsReducer from './products/productsSlice'

  export const store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorite: favoriteReducer,
      productPopupState: productPopupStateReducer,
      sizesPopupState: sizesPopupStateReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;