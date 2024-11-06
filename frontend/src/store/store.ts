import { configureStore } from '@reduxjs/toolkit'
import productPopupStateReducer from './productPopup/productPopupSlice'
import sizesPopupStateReducer from './sizesPopup/sizesPopupSlice'
import productsReducer from './products/productsSlice'
import selectedProductReducer from './selectedProduct/selectedProductSlice'
import searchBarValueStateReducer from './search-bar-input-value/searchBarInputValueSlice'
import favoritesStateReducer from './favorites/favoritesSlice'
import cartStateReducer from './cart/cartSlice'
import cartSidebarStateReducer from './cart/cartSidebarState'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productPopupState: productPopupStateReducer,
    sizesPopupState: sizesPopupStateReducer,
    selectedProduct: selectedProductReducer,
    searchBarInputValueState: searchBarValueStateReducer,
    favoritesState: favoritesStateReducer,
    cartState: cartStateReducer,
    cartSidebarState: cartSidebarStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;