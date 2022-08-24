import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testReducer";
import textReducer from "./textReducer";

const store = configureStore({
  reducer: {
    test: testReducer,
    text: textReducer,
  },
});

export default store;
