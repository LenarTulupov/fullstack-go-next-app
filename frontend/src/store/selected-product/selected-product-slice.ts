import { IProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedProduct {
  selectedProduct: IProduct | null;
}

const initialState: ISelectedProduct = {
  selectedProduct: null,
}

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<IProduct | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;

