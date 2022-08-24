import { createSlice } from "@reduxjs/toolkit";
import { generateTypingStats } from "../utils/testStats";

const initialState = {
  status: "notStarted",
  caretPosition: 0,
  typingStats: null,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestStatus(state, action) {
      state.status = action.payload;
      return state;
    },
    moveCaretForward(state, action) {
      state.caretPosition++;
      return state;
    },
    moveCaretBackward(state, action) {
      state.caretPosition--;
      return state;
    },
    setTypingStats(state, action) {
      state.typingStats = generateTypingStats(action.payload);
    },
  },
});

export default testSlice.reducer;
export const {
  setTestStatus,
  moveCaretForward,
  moveCaretBackward,
  setTypingStats,
} = testSlice.actions;
