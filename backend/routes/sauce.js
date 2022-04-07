
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const sauceCtrl = require("../controllers/sauce");

router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;