import { configureStore } from "@reduxjs/toolkit";
import productPopupStateReducer from "./productPopup/product-popup-slice";
import sizesPopupStateReducer from "./sizesPopup/sizesPopupSlice";
import productsReducer from "./products/productsSlice";
import selectedProductReducer from "./selectedProduct/selected-product-slice";
import searchBarValueStateReducer from "./search-bar-input-value/searchBarInputValueSlice";
import favoritesStateReducer from "./favorites/favorites-slice";
import cartStateReducer from "./cart/cart-slice";
import cartSidebarStateReducer from "./cart/cart-sidebar-state";
import sizeFilterReducer from "./sizeFilter/sizeFilterSlice";
import colorFilterReducer from "./color-filter/color-filter-slice";
import priceFilterReducer from "./priceFilter/priceFilterSlice";
import selectedSortOptionReducer from "./selected-sort-option/selected-sort-option-slice";
import searchProductsReducer from "./search-products/search-products-slice";

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
    sizeFilter: sizeFilterReducer,
    colorFilter: colorFilterReducer,
    priceFilter: priceFilterReducer,
    selectedSortOption: selectedSortOptionReducer,
    searchProducts: searchProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
