import { useEffect, useState } from "react";

const style = {
  correct: { color: "green" },
  incorrect: { color: "red" },
  current: { color: "white", backgroundColor: "black" },
  null: { color: "black" },
};

const Text = ({ textStr, typingStats, setTypingStats }) => {
  const [text, setText] = useState(initTextState(textStr));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const handleCharInput = (e) => {
      const typingTime = Math.round(performance.now() - start);

      if (text.length === idx + 1) {
        console.log(generateTypingStats(text));

        const updatedLetter = {
          char: text[idx].char,
          typingTime: typingTime,
          state: e.key === text[idx].char ? "correct" : "incorrect",
        };
        setIdx((prev) => prev + 1);
        const updatedtext = [
          ...text.slice(0, idx),
          updatedLetter,
          ...text.slice(idx + 1),
        ];
        setText(updatedtext);

        setTypingStats((prev) => {
          return generateTypingStats(text);
        });
        return;
      }

      const updatedLetter = {
        char: text[idx].char,
        typingTime: typingTime,
        state: e.key === text[idx].char ? "correct" : "incorrect",
      };
      setIdx((prev) => prev + 1);
      const updatedtext = [
        ...text.slice(0, idx),
        updatedLetter,
        ...text.slice(idx + 1),
      ];
      setText(updatedtext);
    };

    const handleBackspace = (e) => {
      if (e.key === "Backspace" && idx === 0) {
        return;
      }
      const typingTime = Math.round(performance.now() - start);
      if (e.key === "Backspace") {
        const updatedLetter = {
          char: text[idx - 1].char,
          typingTime: typingTime,
          state: null,
        };
        setIdx((prev) => prev - 1);
        const updatedtext = [
          ...text.slice(0, idx - 1),
          updatedLetter,
          ...text.slice(idx),
        ];
        setText(updatedtext);
      }
    };

    window.addEventListener("keypress", handleCharInput);
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keypress", handleCharInput);
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [idx, text, setTypingStats]);

  return (
    <div className="Text" style={{ fontSize: "1rem" }}>
      {text.map((letter, i) => (
        <span
          className="Letter"
          key={i}
          style={i === idx ? style["current"] : style[letter.state]}
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
export { Text };
