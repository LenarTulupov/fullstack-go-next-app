// store/colorFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorFilterState {
  selectedColors: string[];
}

const initialState: ColorFilterState = {
  selectedColors: [],
};

const colorFilterSlice = createSlice({
  name: 'colorFilter',
  initialState,
  reducers: {
    toggleColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      if (state.selectedColors.includes(color)) {
        // Если цвет уже выбран, удаляем его
        state.selectedColors = state.selectedColors.filter(c => c !== color);
      } else {
        // Если цвет не выбран, добавляем его
        state.selectedColors.push(color);
      }
    },
    clearColors(state) {
      state.selectedColors = [];
    },
  },
});

export const { toggleColor, clearColors } = colorFilterSlice.actions;
export default colorFilterSlice.reducer;
