import { IProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
}

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  }
});

export const productsArray = (state: RootState) => state.product.products;

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
