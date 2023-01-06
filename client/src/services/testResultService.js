import axios from "axios";
const baseUrl = "/api/test-result";

const postTestResult = async (testResult) => {
  try {
    const res = await axios.post(baseUrl, testResult);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return null;
};

const testResultService = { postTestResult };
export default testResultService;
