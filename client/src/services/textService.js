import axios from "axios";
const baseUrl = "/api/text";

const getText = async (lang, wordScope, wordCount) => {
  const url = baseUrl + `/${lang}/${wordScope}/${wordCount}`;
  const res = await axios.get(url);
  return res.data.text;
};

const textService = { getText };
export default textService;
