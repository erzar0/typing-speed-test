import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Letter } from "./Letter";
import { initText } from "../reducers/textReducer";

const Text = ({ textStr }) => {
  const text = useSelector((state) => state.text);
  const test = useSelector((state) => state.test);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!text) {
      dispatch(initText(textStr));
    }
  }, [dispatch, text, textStr]);

  return (
    <div className="Text" style={{ fontSize: "1rem" }}>
      {text &&
        text.map((letter, i) => (
          <Letter key={i} letter={letter} caretPosition={test.caretPosition} />
        ))}
    </div>
  );
};

export default Text;
