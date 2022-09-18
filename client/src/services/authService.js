import axios from "axios";
const baseUrl = "/api/auth";

// axios.defaults.withCredentials = true;

const login = async (username, password) => {
  const res = await axios.post(baseUrl + "/login", { username, password });
  return res.data;
};

const logout = async () => {
  const res = await axios.get(baseUrl + "/logout");
  return res.data;
};

const isUserLogged = async () => {
  const res = await axios.get(baseUrl + "/login-success");
  return res.data;
};

const register = async ({ username, password, email }) => {
  const registerData = {
    username,
    email,
    password,
  };
  const res = await axios.post(baseUrl + "/register", registerData);
  return res.data;
};

const authService = { login, isUserLogged, logout, register };
export default authService;
