import { configureStore } from "@reduxjs/toolkit";
import sizesPopupStateReducer from "./sizes-popup/sizes-popup-slice";
import productsReducer from "./products/productsSlice";
import searchBarValueStateReducer from "./search-bar-input-value/search-bar-input-value-slice";
import favoritesStateReducer from "./favorites/favorites-slice";
import cartStateReducer from "./cart/cart-slice";
import cartSidebarStateReducer from "./cart/cart-sidebar-state";
import sizeFilterReducer from "./size-filter/size-filter-slice";
import colorFilterReducer from "./color-filter/color-filter-slice";
import priceFilterReducer from "./price-filter/price-filter-slice";
import productPopupStateReducer from './product-popup/product-popup-slice'
import selectedProductReducer from './selected-product/selected-product-slice'
import selectedSortOptionReducer from './selected-sort-option/selected-sort-option-slice'
import searchProductsReducer from './search-products/search-products-slice'
import sizeChartPopupReducer from './size-chart-popup/size-chart-popup-slice'
import modalReducer from './modal/modal-slice'
import cookieModalReducer from './cookie-modal/cookie-modal-slice'
import userReducer from './user/userSlice'

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
    sizeChartPopupState: sizeChartPopupReducer,
    modal: modalReducer,
    cookieModalState: cookieModalReducer,
    userState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
