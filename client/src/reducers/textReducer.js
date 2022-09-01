import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: null,
  reducers: {
    resetText(state, action) {
      state = null;
      return state;
    },
    initText(state, action) {
      const textStr = action.payload;
      const getBasicLetterState = (char, i) => {
        return {
          position: i,
          char: char,
          status: "notTyped",
          typingTime: null,
        };
      };
      state = textStr.split("").map((char, i) => getBasicLetterState(char, i));
      return state;
    },
    updateLetterInText(state, action) {
      const updatedLetter = action.payload;
      state = state.map((letter, i) =>
        updatedLetter.position === i ? updatedLetter : letter
      );
      return state;
    },
  },
});

export default textSlice.reducer;

export const { resetText, initText, updateLetterInText } = textSlice.actions;
