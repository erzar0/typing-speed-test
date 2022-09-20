import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
    // setRole(state, action) {
    //   state = action.payload;
    //   return state;
    // },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// export const setUserIfLogged = () => {
//   return async (dispatch) => {
//     const res = await axios.get("/api/auth/login");
//     if (res.data.loggedIn === true) {
//       dispatch(setUser(res.data.loggedIn));
//     }
//   };
// };
