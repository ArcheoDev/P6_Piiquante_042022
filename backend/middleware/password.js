const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
      console.log("mot de passe incorrect");
      res.status(400).json({
        message:
          "Le mot de passe doit faire entre 5 et 15 caractères et contenir au moins une minuscule, une majuscule et un chiffre",
      });
    }
  };