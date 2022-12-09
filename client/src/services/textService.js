import axios from "axios";
const baseUrl = "/api/text";

const getText = async ({ language, wordScope, wordCount }) => {
  const url = baseUrl + `/${language}/${wordScope}/${wordCount}`;
  const res = await axios.get(url);
  return res.data.text;
};

const textService = { getText };
export default textService;
