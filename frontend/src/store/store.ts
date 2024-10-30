import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters/filtersSlice'
import favoriteReducer from './favorite-button/favoriteButtonSlice'
import productPopupStateReducer from './productPopup/productPopupSlice'
import sizesPopupStateReducer from './sizesPopup/sizesPopupSlice'
import productsReducer from './products/productsSlice'
import selectedProductReducer from './selectedProduct/selectedProductSlice'
import searchBarValueStateReducer from './search-bar-input-value/searchBarInputValueSlice'
import favoritesStateReducer from './favorites/favoritesSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorite: favoriteReducer,
    productPopupState: productPopupStateReducer,
    sizesPopupState: sizesPopupStateReducer,
    selectedProduct: selectedProductReducer,
    searchBarInputValueState: searchBarValueStateReducer,
    favoritesState: favoritesStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;