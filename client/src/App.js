import { useSelector } from "react-redux";
import { setUser, setRole } from "./reduxSlices/userSlice";

import { Routes, Route } from "react-router-dom";
import { authService } from "./services/authService";

import Header from "./components/Header";
import Footer from "./components/Footer";

import TestView from "./views/typingTest/TypingTest";
import TypingStatsView from "./views/typingStats/TypingStats";
import Login from "./views/login/Login";
import { useEffect } from "react";

function App() {
  const test = useSelector((state) => state.test);
  const user = useSelector((state) => state.user);

  useEffect(() => {}, []);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between",
        alignItems: "center",
        maxHeight: "100%",
        minHeight: "100vh",
        width: "100%",
        outline: "solid",
        outlineColor: "white",
      }}
    >
      <Header />
      <Routes>
        {user || <Route path="/login" element={<Login />}></Route>}
        <Route path="/" element={<TestView />}></Route>
        <Route
          path="/currentStats"
          element={<TypingStatsView typingStats={test.typingStats} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
