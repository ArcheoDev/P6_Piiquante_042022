const passWord = require("password-validator");

const passwordSchema = new passWord();

passwordSchema
  .is().min(10) 
  .is().max(20)
  .has().uppercase() 
  .has().lowercase() 
  .has().digits()
  .has().not().spaces()

module.exports = passwordSchema;