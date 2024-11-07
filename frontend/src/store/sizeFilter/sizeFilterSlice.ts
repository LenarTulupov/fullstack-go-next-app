import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SizeFilterState {
  selectedSizes: string[];
}

const initialState: SizeFilterState = {
  selectedSizes: [],
};

const sizeFilterSlice = createSlice({
  name: 'sizeFilter',
  initialState,
  reducers: {
    toggleSize(state, action: PayloadAction<string>) {
      const size = action.payload;
      if (state.selectedSizes.includes(size)) {
        state.selectedSizes = state.selectedSizes.filter(s => s !== size);
      } else {
        state.selectedSizes.push(size);
      }
    },
    clearSizes(state) {
      state.selectedSizes = [];
    },
  },
});

export const { toggleSize, clearSizes } = sizeFilterSlice.actions;
export default sizeFilterSlice.reducer;
