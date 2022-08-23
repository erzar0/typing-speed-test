import "./App.css";
import { useState } from "react";
import { Text } from "./components/Text";

const textStr =
  "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem.";

function App() {
  const [typingStats, setTypingStats] = useState(null);

  const TextProps = { typingStats, setTypingStats, textStr };
  return (
    <div className="App" style={{ fontFamily: "monospace" }}>
      <Text {...TextProps} />
      {typingStats && (
        <div>Your typing stats are: {JSON.stringify(typingStats)}</div>
      )}
    </div>
  );
}

export default App;
