import axios from "axios";
const baseUrl = "/api/test-result";

const postTestResult = async (testResult) => {
  try {
    const res = await axios.post(baseUrl, testResult);
  } catch (e) {
    console.log(e);
  }
  console.log(res);
  return res.data;
};
