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
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  }
});

export const productsData = (state: RootState) => state.products.products;

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
