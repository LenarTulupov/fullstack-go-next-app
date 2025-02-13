import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";
import { IUser } from "@/types/user.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk<IUser[], void>(
  "users/fetchUsers",
  async () => {
    const response = await fetch(`${URL}${API_ENDPOINTS.USERS}`);
    if(!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  }
);

interface IUsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
  }
});

export default usersSlice.reducer;

