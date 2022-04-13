// Importation

const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/sauce");

// Création des router

router.get("/:id", auth, stuffCtrl.getOneSauce);
router.get("/", auth, stuffCtrl.getAllSauces);
router.post("/", auth, multer, stuffCtrl.createSauce);
router.put("/:id", auth, multer, stuffCtrl.updateSauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);
router.post("/:id/like", auth, stuffCtrl.sauceLikes);

//Exportation de router

module.exports = router;