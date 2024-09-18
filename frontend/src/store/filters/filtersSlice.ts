import { IProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFilterSlice {
  sizes: {
    id: number;
    name: string
  }[];
  colors: string[];
}

const initialState: IFilterSlice = {
  sizes: [],
  colors: [],
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IProduct[]>) => {
      const products = action.payload;

      const sizesArray = products.reduce((prev, curr) => 
        curr.sizes.length > prev.sizes.length ? curr : prev);

      const colorsArray = products
        .flatMap((product) => product.product_colors[0].color.name)
        .filter((value, index, self) => self.indexOf(value) === index);

      state.sizes = sizesArray.sizes.map(size => ({
        id: size.id,
        name: size.name || '' // Обработайте потенциальное значение undefined
      }));
      state.colors = colorsArray;
    },
  },
});

export const sizesArray = (state: RootState) => state.filters.sizes;
export const colorsArray = (state: RootState) => state.filters.colors;

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;