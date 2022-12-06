import { createSlice } from "@reduxjs/toolkit";
import { generateTypingStats } from "../utils/testStats";
import axios from "axios";

const initialState = {
  status: "notLoaded",
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
      return state;
    },
    reset(state, action) {
      state = { ...initialState, typingStats: state.typingStats };
      return state;
    },
  },
});

export default testSlice.reducer;
export const {
  reset,
  setTestStatus,
  moveCaretForward,
  moveCaretBackward,
  setTypingStats,
} = testSlice.actions;

export const resetTest = (testResult) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/test-result", testResult);
    } catch (e) {
      console.log(e);
    }
    dispatch(reset());
  };
};
