import { useEffect, useReducer } from "react";
import { Letter } from "./Letter";

const Text = ({ textStr, typingStats, setTypingStats }) => {
  const [state, dispatch] = useReducer(reducer, initState(textStr));

  useEffect(() => {
    if (state.status === "finished") {
      setTypingStats(generateTypingStats(state.text));
      return;
    }
    const start = performance.now();
    const handleCharInput = (e) => {
      const typingTime = Math.round(performance.now() - start);

      if (state.text.length === state.idx + 1) {
        dispatch({
          type: "endTest",
          typingTime,
          key: e.key,
        });
        return;
      }
      dispatch({ type: "caretForward", typingTime, key: e.key });
    };

    const handleBackspace = (e) => {
      if (e.key === "Backspace" && state.idx !== 0) {
        const typingTime = Math.round(performance.now() - start);
        dispatch({ type: "caretBackward", typingTime, key: e.key });
      }
    };

    window.addEventListener("keypress", handleCharInput);
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keypress", handleCharInput);
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [dispatch, setTypingStats, state.text, state.idx, state.status]);

  return (
    <div className="Text" style={{ fontSize: "1rem" }}>
      {state.text.map((letter, i) => (
        <Letter {...{ i, letter, state }} />
      ))}
      {typingStats && <div>Your typing stats are: {typingStats.errorRate}</div>}
    </div>
  );
};

function initState(textStr) {
  return {
    text: textStr ? initText(textStr) : null,
    idx: 0,
    status: "notStarted",
  };
}
function initText(textStr) {
  let text = textStr.split("");
  text = text.map((char) => {
    return { char: char, status: "notTyped", typingTime: null };
  });
  return text;
}
function generateTypingStats(text) {
  let stats = { time: {} };
  for (let letter of text) {
    const t = letter.typingTime;
    const char = letter.char;
    stats.time[char] = stats.time[char] ? [...stats.time[char], t] : [t];
  }
  stats.totalTime =
    Object.values(stats.time)
      .flatMap((time) => time)
      .reduce((prev, curr) => prev + curr, 0) / 1000;
  stats.accuracy =
    (text
      .filter((letter) => letter.status === "correct")
      .reduce((prev, curr) => prev + 1, 0) /
      text.length) *
    100;
  stats.wpm = (text.length / (stats.totalTime / 60) / 5) * stats.accuracy;
  console.log(stats);
  return stats;
}

function reducer(state, action) {
  const { text, idx } = state;
  const { type, typingTime, key } = action;

  const moveCaretForward = () => {
    const updatedLetter = {
      char: text[idx].char,
      typingTime: typingTime,
      status: key === text[idx].char ? "correct" : "incorrect",
    };
    const updatedText = [
      ...text.slice(0, idx),
      updatedLetter,
      ...text.slice(idx + 1),
    ];
    return { ...state, idx: idx + 1, text: updatedText };
  };
  const moveCaretBackward = () => {
    const updatedLetter = {
      char: text[idx - 1].char,
      typingTime: typingTime,
      status: "notTyped",
    };
    const updatedText = [
      ...text.slice(0, idx - 1),
      updatedLetter,
      ...text.slice(idx),
    ];
    return { ...state, idx: idx - 1, text: updatedText };
  };

  switch (type) {
    case "caretForward":
      return moveCaretForward();
    case "caretBackward":
      return moveCaretBackward();
    case "endTest":
      const finalState = moveCaretForward();
      return { ...finalState, status: "finished" };
    default:
      return state;
  }
}
export { Text };
