import { useEffect } from "react";
import Text from "./Text/Text";

import { useDispatch, useSelector } from "react-redux";
import {
  updateLetterInText,
  initText,
  resetText,
} from "../../reduxSlices/textSlice";
import {
  moveCaretForward,
  moveCaretBackward,
  setTestStatus,
  setTypingStats,
  resetTest,
} from "../../reduxSlices/testSlice";

import { useNavigate } from "react-router-dom";

import textService from "../../services/textService";

const Test = () => {
  const dispatch = useDispatch();
  const { test, text } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = performance.now();
    if (test.status === "finished") {
      dispatch(setTypingStats(text));
      dispatch(resetTest());
      dispatch(resetText());
      navigate("/currentStats");
      return;
    } else if (test.status === "notStarted") {
      textService
        .getText("en", "basic", 10)
        .then((t) => {
          dispatch(initText(t));
          dispatch(setTestStatus("started"));
        })
        .catch((e) => console.log(e));
      return;
    }

    const handleCharInput = (e) => {
      const dt = Math.round(performance.now() - startTime);
      const currLetter = text[test.caretPosition];
      const typingTime = currLetter.typingTime + dt;
      let status = "";
      if (currLetter.status === "toCorrect") {
        status = currLetter.char === e.key ? "corrected" : "incorrect";
      } else {
        status = currLetter.char === e.key ? "correct" : "incorrect";
      }
      const updatedLetter = { ...currLetter, typingTime, status };

      dispatch(updateLetterInText(updatedLetter));
      dispatch(moveCaretForward());

      if (test.caretPosition + 1 === text.length) {
        dispatch(setTestStatus("finished"));
      }
    };

    const handleBackspace = (e) => {
      if (e.key === "Backspace" && test.caretPosition > 0) {
        const dt = Math.round(performance.now() - startTime);
        const currLetter = text[test.caretPosition - 1];
        const typingTime = currLetter.typingTime + dt;
        const status = "toCorrect";
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
  }, [test.caretPosition, test.status, text]);

  return (
    <>{test.status === "started" ? <Text test={test} text={text} /> : null}</>
  );
};
// function getUpdatedLetter(e, text, test, dt) {
//   // const dt = Math.round(performance.now() - startTime);
//   const currLetter = text[test.caretPosition];
//   const typingTime = currLetter.typingTime + dt;
//   let status = "";
//   if (currLetter.status === "toCorrect") {
//     status = currLetter.char === e.key ? "corrected" : "incorrect";
//   } else {
//     status = currLetter.char === e.key ? "correct" : "incorrect";
//   }
//   const updatedLetter = { ...currLetter, typingTime, status };
//   return updatedLetter;
// }
export default Test;
