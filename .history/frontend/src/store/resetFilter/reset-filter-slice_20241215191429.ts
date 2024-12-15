import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearSizes } from "../size-filter/size-filter-slice";
import { clearColors } from "../color-filter/color-filter-slice";
import { clearPrice } from "../price-filter/price-filter-slice";
import { clearSelectedSortOption } from "../selected-sort-option/selected-sort-option-slice";

export const resetAllFilters = createAsyncThunk(
  "resetFilter/resetAllFilters",
  async (_, { dispatch }) => {
    dispatch(clearSizes());
    dispatch(clearColors());
    dispatch(clearPrice());
    dispatch(clearSelectedSortOption());
  }
);

const resetFilterSlice = createSlice({
  name: "resetFilter",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetAllFilters.fulfilled, (state) => {});
  },
});

export default resetFilterSlice.reducer;
