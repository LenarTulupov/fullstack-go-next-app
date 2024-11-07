import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedSortOptionState {
  selectedSortOption: string;
}

const initialState: ISelectedSortOptionState = {
  selectedSortOption: 'recommend',
} 

export const selectedSortOptionSlice = createSlice({
  name: 'selectedSortOption',
  initialState,
  reducers: {
    setSelectedSortOption: (state, action: PayloadAction<string>) => {
      state.selectedSortOption = action.payload;
    },
    clearSelectedSortOption: (state) => {
      state.selectedSortOption = initialState.selectedSortOption;
    }
  }
});

export const { setSelectedSortOption, clearSelectedSortOption } = selectedSortOptionSlice.actions;
export default selectedSortOptionSlice.reducer;