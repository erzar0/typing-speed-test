const basicLetterStyle = { margin: "0px" };
const letterStyle = {
  correct: { color: "white", opacity: "0.5" },
  corrected: { color: "orange" },
  incorrect: {
    color: "white",
    backgroundColor: "red",
  },
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
          ? { ...letterStyle["current"], ...basicLetterStyle }
          : { ...letterStyle[letter.status], ...basicLetterStyle }
      }
    >
      {letter.char}
    </span>
  );
};

export { Letter };
