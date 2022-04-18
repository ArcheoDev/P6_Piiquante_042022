const passWord = require("password-validator");

const passwordSchema = new passWord();

passwordSchema
  .is().min(10) //min 10 ca
  .is().max(20)
  .has().uppercase() //1 maj
  .has().lowercase() //1 min
  .has().digits()
  .has().not().spaces()

module.exports = passwordSchema;