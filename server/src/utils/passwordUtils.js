const bcrypt = require("bcrypt");

const saltRounds = 10;

async function generate(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function validate(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

module.exports = { generate, validate };
