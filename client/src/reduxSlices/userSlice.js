import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      return state;
    },
    setRole(state, action) {
      state.role = action.payload;
      return state;
    },
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
