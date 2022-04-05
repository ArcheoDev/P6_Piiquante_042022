const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, process.env.TOKEN_KEY);

    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw "User Id non valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Requête non authentifiée")
     });
  }
};