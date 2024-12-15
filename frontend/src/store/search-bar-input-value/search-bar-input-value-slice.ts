import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchBarInputValueState {
  searchBarInputValue: string;
}

const initialState: ISearchBarInputValueState = {
  searchBarInputValue: ''
}

export const searchBarInputValueSlice = createSlice({
  name: 'searchBarInputValueState',
  initialState,
  reducers: {
    searchBarInputValueState: (state, action: PayloadAction<string>) => {
      state.searchBarInputValue = action.payload;
    } 
  }
})

export const { searchBarInputValueState } = searchBarInputValueSlice.actions;
export default searchBarInputValueSlice.reducer;