const bcrypt = require("bcrypt");

const saltRounds = 10;
function generate(password) {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    return hash;
  });
}

function validate(password, hash) {
  bcrypt.compare(password, hash, function (err, result) {
    return result;
  });
}

module.exports = { generate, validate };
