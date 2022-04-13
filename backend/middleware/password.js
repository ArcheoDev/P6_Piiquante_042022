// Importation

const passwordSchema = require('../models/password');

// Password

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit être constitué de 10 caractères minimum, dont une majuscule, une minuscule et un caractère spécial' });
    } else {
        next();
    }
};