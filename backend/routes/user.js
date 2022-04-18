// Importation

const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const password = require("../middleware/password");

// Router pour la login et le signup

router.post("/signup", password, userCtrl.signup);
router.post("/login", password, userCtrl.login);

module.exports = router ;
