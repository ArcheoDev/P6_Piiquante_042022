//Importation

const Sauce = require("../models/sauce");
const User = require('../models/user');
const fs = require("fs");
const like = require("../controllers/sauce");

//Afficher toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Afficher une sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Créer une nouvelle sauce

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [""],
    usersDisliked: [""],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};


// Modifier une sauce

  exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      if (req.file == null) {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    });
  };

  // Supprimer une sauce

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(
        (sauce) => {
          const filename = sauce.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => { 
          Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        }
      )
      .catch((error) => res.status(500).json({ error }));
  };

// Like et dislike des sauces

exports.sauceLikes = (req, res, next) => {
  // console.log(req.params.id);
  // console.log(req.body);

  let like = req.body.like
  let sauceId = req.params.id;
  let userId = req.body.userId;

  switch (like) {
    case 1 :
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
      .then(() => res.status(200).json({ message: `J'aime` }))
      .catch((error) => res.status(400).json({ error }))

      break;

    case 0:
      Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
       if (sauce.usersLiked.includes(userId)) { 
         Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
           .then(() => res.status(200).json({ message: `Sauce 0` }))
           .catch((error) => res.status(400).json({ error }))
       }
       if (sauce.usersDisliked.includes(userId)) { 
         Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
           .then(() => res.status(200).json({ message: `Sauce 0` }))
           .catch((error) => res.status(400).json({ error }))
       }
     })
     .catch((error) => res.status(404).json({ error }))
    break;

    case -1 :
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
      .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
      .catch((error) => res.status(400).json({ error }))
    break;

    default:
      console.log(error);
  }
};