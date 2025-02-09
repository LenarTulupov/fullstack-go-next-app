import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  role: string | null;
}

const initialState: IUser = {
  role: null
}

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    }
  }
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;