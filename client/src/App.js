import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import TestView from "./views/TestView/TestView";
import TypingStatsView from "./views/TypingStatsView/TypingStatsView";

function App() {
  const textStr =
    "Sed ut perspiciatis, unde omnisddddddddddddddddddddddddd iste natus error sit voluptatem.";

  const test = useSelector((state) => state.test);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TestView textStr={textStr} />}></Route>
        <Route
          path="/currentStats"
          element={<TypingStatsView typingStats={test.typingStats} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
