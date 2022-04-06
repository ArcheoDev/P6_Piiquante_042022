require("dotenv").config();
const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
// const path = require('path')

const userRoutes = require("./routes/user");

// Mongoose

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
//Express

const app = express();
app.use(express.json());

//Correction erreur CORS

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

  app.use('/api/auth', userRoutes);

  module.exports = app;