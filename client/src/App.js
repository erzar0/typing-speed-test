import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import authService from "./services/authService";
import { useEffect } from "react";
import { setUser } from "./reduxSlices/userSlice";
import style from "./App.module.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import TestView from "./views/typingTest/TypingTest";
import TypingStatsView from "./views/typingStats/TypingStats";
import Login from "./views/login/Login";
import Register from "./views/register/Register";

function App() {
  const test = useSelector((state) => state.test);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .isUserLogged()
      .then((data) => {
        let user = null;
        if (data.success) {
          user = data.user;
        }
        dispatch(setUser(user));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={style.AppContainer}>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<TestView />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/recent-stats"
          element={<TypingStatsView typingStats={test.typingStats} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
