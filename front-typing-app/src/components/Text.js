import { useEffect, useReducer } from "react";

const style = {
  correct: { color: "green" },
  incorrect: { color: "red" },
  current: { color: "white", backgroundColor: "black" },
  null: { color: "black" },
};

const Text = ({ textStr, typingStats, setTypingStats }) => {
  const initialState = { text: initTextState(textStr), idx: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const start = performance.now();
    const handleCharInput = (e) => {
      const typingTime = Math.round(performance.now() - start);

      if (state.text.length === state.idx + 1) {
        dispatch({ type: "caretForward", typingTime, key: e.key });
        setTypingStats((prev) => {
          return generateTypingStats(state.text);
        });
        return;
      }
      dispatch({ type: "caretForward", typingTime, key: e.key });
    };

    const handleBackspace = (e) => {
      const typingTime = Math.round(performance.now() - start);
      if (e.key === "Backspace" && state.idx === 0) {
        return;
      }
      if (e.key === "Backspace") {
        dispatch({ type: "caretBackward", typingTime, key: e.key });
      }
    };

    window.addEventListener("keypress", handleCharInput);
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keypress", handleCharInput);
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [dispatch, setTypingStats, state.text, state.idx]);

  return (
    <div className="Text" style={{ fontSize: "1rem" }}>
      {state.text.map((letter, i) => (
        <span
          className="Letter"
          key={i}
          style={i === state.idx ? style["current"] : style[letter.state]}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

function initTextState(textStr) {
  let text = textStr.split("");
  text = text.map((char) => {
    return { char: char, state: null, typingTime: 0 };
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
  return stats;
}

function reducer({ text, idx }, { type, typingTime, key }) {
  switch (type) {
    case "caretForward": {
      const updatedLetter = {
        char: text[idx].char,
        typingTime: typingTime,
        state: key === text[idx].char ? "correct" : "incorrect",
      };
      const updatedText = [
        ...text.slice(0, idx),
        updatedLetter,
        ...text.slice(idx + 1),
      ];
      return { idx: idx + 1, text: updatedText };
    }

    case "caretBackward": {
      const updatedLetter = {
        char: text[idx - 1].char,
        typingTime: typingTime,
        state: null,
      };
      const updatedText = [
        ...text.slice(0, idx - 1),
        updatedLetter,
        ...text.slice(idx),
      ];
      return { idx: idx - 1, text: updatedText };
    }

    default:
      return { text, idx };
  }
}
export { Text };
