const passWord = require("password-validator");

const passwordSchema = new passWord();

passwordSchema
  .is()
  .min(10)
  .is()
  .max(20)
  .has()
  .uppercase(1)
  .has()
  .lowercase(1)
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .is()
  .not()

module.exports = passwordSchema;