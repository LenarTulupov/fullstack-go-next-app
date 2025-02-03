import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ICookieModal {
  isCookieModalOpened: boolean
}

const initialState: ICookieModal = {
  isCookieModalOpened: false
}

export const cookieModalSlice = createSlice({
  name: "cookieModalState",
  initialState,
  reducers: {
    setIsCookieModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isCookieModalOpened = action.payload;
    }
  }
});

export const { setIsCookieModalOpened } = cookieModalSlice.actions;
export default cookieModalSlice.reducer;