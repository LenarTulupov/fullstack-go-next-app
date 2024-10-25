import { createSlice } from "@reduxjs/toolkit";

interface IProductPopup {
  isProductPopupOpened: boolean;
}

const initialState: IProductPopup = {
  isProductPopupOpened: false
}

export const productPopupSlice = createSlice({
  name: 'productPopupState',
  initialState,
  reducers: {
    productPopupState: (state) => {
      state.isProductPopupOpened = !state.isProductPopupOpened
    }
  }
});

export const { productPopupState } = productPopupSlice.actions;
export default productPopupSlice.reducer;