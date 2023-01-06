import { useEffect, useRef, useState } from "react";
import Text from "./Text/Text";

import { useDispatch, useSelector } from "react-redux";
import { updateLetterInText, initText } from "../../reduxSlices/textSlice";
import {
  moveCaretForward,
  moveCaretBackward,
  setTestStatus,
  setTypingStats,
  resetTestAndPostResult,
} from "../../reduxSlices/testSlice";

import { useNavigate } from "react-router-dom";

import textService from "../../services/textService";
import style from "./TypingTest.module.css";

const TypingTest = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testSettings, setTestSettings] = useState({
    language: "pl",
    wordScope: "10k",
    wordCount: 10,
  });
  const { test, text } = useSelector((state) => state);
  const [elapsedTime, setElapsedTime] = useState(0);
  let elapsedTimeInterval = useRef(0);
  let lastKeyStrokeTime = useRef(null);

  useEffect(() => {
    if (test.status === "notLoaded") {
      textService
        .getText(testSettings)
        .then((t) => {
          dispatch(initText(t));
          dispatch(setTestStatus("loaded"));
        })
        .catch((e) => console.log(e));
      return;
    }
    if (test.status === "started") {
      lastKeyStrokeTime = performance.now();
    }
    if (test.status === "finished") {
      clearInterval(elapsedTimeInterval);
      dispatch(resetTestAndPostResult({ testResult: text, user }));
      dispatch(setTypingStats(text));
      navigate("/current-stats");
      return;
    }

    const handleCharInput = (e) => {
      if (test.status === "started" && e.key !== "Enter") {
        console.log(e.key);
        const dt = Math.min(
          Math.round(performance.now() - lastKeyStrokeTime),
          2000
        );
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
      }
    };

    const handleBackspaceAndEnter = (e) => {
      if (test.status === "loaded" && e.key === "Enter") {
        dispatch(setTestStatus("started"));
        const dt = 1000;
        elapsedTimeInterval = setInterval(
          () => setElapsedTime((prev) => prev + dt),
          dt
        );
      }

      if (test.status === "started") {
        if (e.key === "Backspace" && test.caretPosition > 0) {
          const dt = Math.min(
            Math.round(performance.now() - lastKeyStrokeTime),
            2000
          );
          const currLetter = text[test.caretPosition - 1];
          const typingTime = currLetter.typingTime + dt;
          const status = "toCorrect";
          const updatedLetter = { ...currLetter, typingTime, status };

          dispatch(updateLetterInText(updatedLetter));
          dispatch(moveCaretBackward());
        }
      }
    };

    window.addEventListener("keypress", handleCharInput);
    window.addEventListener("keydown", handleBackspaceAndEnter);
    return () => {
      window.removeEventListener("keypress", handleCharInput);
      window.removeEventListener("keydown", handleBackspaceAndEnter);
    };
  }, [test.caretPosition, test.status, text]);

  return (
    <div className={style.TestContainer}>
      {["loaded", "started"].some((s) => test.status.includes(s)) ? (
        <>
          <h2 style={{ color: "white", paddingBottom: "2rem" }}>
            {test.status === "loaded"
              ? "Press enter to start!"
              : (elapsedTime / 1000).toFixed(0)}
          </h2>
          <Text test={test} text={text} />
        </>
      ) : null}
    </div>
  );
};
export default TypingTest;
