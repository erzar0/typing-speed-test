import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import textReducer from "./textSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    test: testReducer,
    text: textReducer,
    user: userReducer,
  },
});

export default store;
