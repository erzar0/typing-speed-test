import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: null,
  reducers: {
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
      // console.log(state);
      return state;
    },
  },
});

export default textSlice.reducer;

export const { initText, updateLetterInText } = textSlice.actions;
