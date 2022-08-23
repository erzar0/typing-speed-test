const letterStyle = {
  correct: { color: "green" },
  incorrect: { color: "red" },
  current: { color: "white", backgroundColor: "black" },
  notTyped: { color: "black" },
};
const Letter = ({ letter, state, i }) => {
  return (
    <span
      className="Letter"
      style={
        i === state.idx ? letterStyle["current"] : letterStyle[letter.status]
      }
    >
      {letter.char}
    </span>
  );
};

export { Letter };
