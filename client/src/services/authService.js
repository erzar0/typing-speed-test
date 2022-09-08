import axios from "axios";
const baseUrl = "/api/auth";

axios.defaults.withCredentials = true;
const login = async (username, password) => {
  const res = await axios.post(baseUrl + "/login", { username, password });
  console.log(res);
  return res;
};

const authService = { login };
export default authService;
