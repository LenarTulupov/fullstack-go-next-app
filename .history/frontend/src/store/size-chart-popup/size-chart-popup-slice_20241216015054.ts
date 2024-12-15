import { createSlice } from "@reduxjs/toolkit";

interface ISizeChartPopupSlice {
  isSizeChartPopupOpened: boolean;
}

const initialState: ISizeChartPopupSlice = {
  isSizeChartPopupOpened: false
}

const sizeChartPopupSlice = createSlice({
  name: 'sizeChartPopupState',
  initialState,
  reducers: {
    sizeChartPopupState: (state) => {
      state.isSizeChartPopupOpened = !state.isSizeChartPopupOpened;
    }
  }
})

export const { sizeChartPopupState } = sizeChartPopupSlice.actions;
export const 