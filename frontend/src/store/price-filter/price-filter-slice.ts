import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPriceFilterState {
  selectedPrice: string | null;
}

const initialState: IPriceFilterState = {
  selectedPrice: null,
}

const priceFilterSlice = createSlice({
  name: 'priceFilter',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<string>) => {
      state.selectedPrice = action.payload;
    },
    clearPrice: (state) => {
      state.selectedPrice = null;
    }
  }
});

export const { setPrice, clearPrice} = priceFilterSlice.actions;
export default priceFilterSlice.reducer;