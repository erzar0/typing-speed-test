import { useEffect } from "react";
import Text from "./Text";

import { useDispatch, useSelector } from "react-redux";
import {
  updateLetterInText,
  initText,
  resetText,
} from "../../reducers/textReducer";
import {
  moveCaretForward,
  moveCaretBackward,
  setTestStatus,
  setTypingStats,
  resetTest,
} from "../../reducers/testReducer";

import { useNavigate } from "react-router-dom";

const Test = ({ textStr }) => {
  const dispatch = useDispatch();
  const { test, text } = useSelector((state) => state);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!text) {
  //     console.log(text);
  //   }
  // }, [dispatch, text, textStr]);

  useEffect(() => {
    const start = performance.now();
    if (test.status === "finished") {
      dispatch(setTypingStats(text));
      dispatch(resetTest());
      dispatch(resetText());
      navigate("/currentStats");
      return;
    } else if (test.status === "notStarted") {
      // dispatch(setTypingStats(null));
      dispatch(initText(textStr));
      dispatch(setTestStatus("started"));
    }

    const handleCharInput = (e) => {
      const typingTime = Math.round(performance.now() - start);
      const currLetter = text[test.caretPosition];
      const status = currLetter.char === e.key ? "correct" : "incorrect";
      const updatedLetter = { ...currLetter, typingTime, status };

      dispatch(updateLetterInText(updatedLetter));
      dispatch(moveCaretForward());

      if (test.caretPosition + 1 === text.length) {
        dispatch(setTestStatus("finished"));
      }
    };

    const handleBackspace = (e) => {
      if (e.key === "Backspace" && test.caretPosition > 0) {
        const typingTime = null;
        const currLetter = text[test.caretPosition - 1];
        const status = "notTyped";
        const updatedLetter = { ...currLetter, typingTime, status };

        dispatch(updateLetterInText(updatedLetter));
        dispatch(moveCaretBackward());
      }
    };

    window.addEventListener("keypress", handleCharInput);
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keypress", handleCharInput);
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [test.caretPosition, test.status]);

  return (
    <>{test.status === "started" ? <Text test={test} text={text} /> : null}</>
  );
};

export default Test;
