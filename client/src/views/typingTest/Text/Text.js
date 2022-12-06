import { Letter } from "./Letter";
import style from "./Text.module.css";

const Text = ({ text, test }) => {
  return (
    <div
      id="text"
      tabIndex={0}
      className={
        test.status === "started"
          ? style.TextContainerFocused
          : style.TextContainerUnfocused
      }
    >
      {text &&
        text.map((letter, i) => (
          <Letter key={i} letter={letter} caretPosition={test.caretPosition} />
        ))}
    </div>
  );
};

export default Text;
