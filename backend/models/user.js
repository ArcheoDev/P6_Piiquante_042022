//Impossibilité d'avoir plusieurs utilisateurs avec la même adresse mail

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Gérer les bug lors de l'utilisation d'un E-mail

userSchema.plugin(uniqueValidator);

//Exportation du model User

module.exports = mongoose.model("User", userSchema);