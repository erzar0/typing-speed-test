const textRouter = require("express").Router();

const fs = require("fs");
const path = require("path");

const { getIntFromRange } = require("../utils/helperFunctions");

const wordsPath = path.join(__dirname, "..", "/assets", "/words");
const readWords = (wordsPath, lang, wordScope) => {
  const p = path.join(wordsPath, `/${lang}_${wordScope}.txt`);
  return fs.readFileSync(p, "utf-8").split("\n");
};

textRouter.get("/:lang/:wordScope/:wordCount", (req, res) => {
  const { lang, wordScope, wordCount } = req.params;
  const words = readWords(wordsPath, lang, wordScope);
  let text = "";

  for (let i = 0; i < wordCount; i++) {
    text += words[getIntFromRange(0, words.length)] + " ";
  }
  res.json({ text: text.trim() });
});

module.exports = textRouter;
