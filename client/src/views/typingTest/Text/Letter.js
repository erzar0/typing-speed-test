const letterStyle = {
  correct: { color: "green" },
  corrected: { color: "orange" },
  incorrect: { color: "red" },
  current: { color: "black", backgroundColor: "white" },
  notTyped: { color: "white" },
  toCorrect: { color: "white" },
};
const Letter = ({ letter, caretPosition }) => {
  return (
    <span
      className="Letter"
      style={
        letter.position === caretPosition
          ? letterStyle["current"]
          : letterStyle[letter.status]
      }
    >
      {letter.char}
    </span>
  );
};

export { Letter };
