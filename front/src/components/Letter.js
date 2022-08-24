const letterStyle = {
  correct: { color: "green" },
  incorrect: { color: "red" },
  current: { color: "white", backgroundColor: "black" },
  notTyped: { color: "black" },
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
