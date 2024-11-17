import { IProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchProductsState {
  filteredProducts: IProduct[];
}

const initialState: ISearchProductsState = {
  filteredProducts: [],
}

const searchProductsSlice = createSlice({
  name: 'filteredProducts',
  initialState,
  reducers: {
    setFilteredProducts(state, action: PayloadAction<IProduct[]>) {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;