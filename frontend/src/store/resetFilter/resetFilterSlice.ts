import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearSizes } from "../sizeFilter/sizeFilterSlice";
import { clearColors } from "../colorFilter/colorFilterSlice";
import { clearPrice } from "../priceFilter/priceFilterSlice";
import { clearSelectedSortOption } from "../selectedSortOption/selectedSortOptionSlice";

export const resetAllFilters = createAsyncThunk(
  'resetFilter/resetAllFilters',
  async (_, { dispatch }) => {
    dispatch(clearSizes());
    dispatch(clearColors());
    dispatch(clearPrice());
    dispatch(clearSelectedSortOption());
  }
);

const resetFilterSlice = createSlice({
  name: 'resetFilter',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetAllFilters.fulfilled, (state) => {
      });
  }
});

export default resetFilterSlice.reducer;
