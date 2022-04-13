// Importation

require("dotenv").config();

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Enregistrement d'un nouvel utilisateur

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        password: hash,
        email: req.body.email,
      });
      user
        .save()
        .then(() => res.status(201).json({ Message: "Utilisateur Créé !" }))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json({ err }));
};

// Connexion d'un utilisateur existant

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ erreur: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ erreur: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.RANDOM_SECRET_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};