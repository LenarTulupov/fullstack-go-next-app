import { createSlice } from "@reduxjs/toolkit";

interface ISizesPopup {
  isSizesPopupOpened: boolean;
}

const initialState: ISizesPopup = {
  isSizesPopupOpened: false
}

export const sizesPopupSlice = createSlice({
  name: 'sizesPopupState',
  initialState,
  reducers: {
    sizesPopupState: (state) => {
      state.isSizesPopupOpened = !state.isSizesPopupOpened
    }
  }
});

export const { sizesPopupState } = sizesPopupSlice.actions;
export default sizesPopupSlice.reducer;