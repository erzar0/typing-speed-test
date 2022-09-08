import { Letter } from "./Letter";
import style from "./Text.module.css";

const Text = ({ text, test }) => {
  return (
    <div id="text" className={style.textContainer}>
      {text &&
        text.map((letter, i) => (
          <Letter key={i} letter={letter} caretPosition={test.caretPosition} />
        ))}
    </div>
  );
};

export default Text;
