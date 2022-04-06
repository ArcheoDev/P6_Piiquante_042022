const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path')

const userRoutes = require("./routes/user");
app.use('/api/auth', userRoutes);

// Mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOOSE_NAME}:${process.env.MONGOOSE_PW}@@cluster0.sq37b.mongodb.net/${process.env.MONGOOSE_PROJECT}?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Express

const app = express();
app.use(express.json());

//Correction erreur CORS

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  module.exports = app;