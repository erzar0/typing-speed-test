import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setUser } from "./reduxSlices/userSlice";
import authService from "./services/authService";
import style from "./App.module.css";

import Header from "./components/Header/Header";
import Notification from "./components/Notification";
import Footer from "./components/Footer/Footer";

import TypingTest from "./views/typingTest/TypingTest";
import TypingStats from "./views/typingStats/TypingStats";
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
      <Notification />
      <Header user={user} />
      <Routes>
        <Route path="/" element={<TypingTest />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/current-stats"
          element={<TypingStats typingStats={test.typingStats} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
