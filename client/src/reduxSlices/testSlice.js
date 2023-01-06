import { createSlice } from "@reduxjs/toolkit";
import { generateTypingStats } from "../utils/testStats";
import axios from "axios";
import testResultService from "../services/testResultService";

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

export const resetTestAndPostResult = ({ testResult, user }) => {
  return async (dispatch) => {
    try {
      if (user.username) {
        const res = await testResultService.postTestResult(testResult);
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(reset());
  };
};
