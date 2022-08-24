import { useEffect } from "react";
import Text from "./Text";
import TypingStats from "./TypingStats";
import { useDispatch, useSelector } from "react-redux";
import { updateLetterInText } from "../reducers/textReducer";
import {
  moveCaretForward,
  moveCaretBackward,
  setTestStatus,
  setTypingStats,
} from "../reducers/testReducer";

const Test = ({ textStr }) => {
  const dispatch = useDispatch();
  const { test, text } = useSelector((state) => state);

  useEffect(() => {
    const start = performance.now();
    if (test.status === "finished") {
      dispatch(setTypingStats(text));
      return;
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
      } else if (test.caretPosition > 0) {
        dispatch(setTestStatus("started"));
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
  }, [
    dispatch,
    test.caretPosition,
    test.position,
    test.status,
    text,
    test.textStr,
  ]);

  return (
    <div>
      <Text textStr={textStr} />
      {test.typingStats && <TypingStats typingStats={test.typingStats} />}
    </div>
  );
};

export default Test;
