import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: [],
  reducers: {
    initText(state, action) {
      const { textStr } = action.payload;
      state = textStr.map((letter) => {
        return { char: letter, status: "notTyped", typingTime: null };
      });
    },
  },
});

function getBasicLetterState(letter) {}
