import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import TestView from "./pages/testPage/Test";
import TypingStatsView from "./pages/typingStats/TypingStats";

function App() {
  const test = useSelector((state) => state.test);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TestView />}></Route>
        <Route
          path="/currentStats"
          element={<TypingStatsView typingStats={test.typingStats} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
