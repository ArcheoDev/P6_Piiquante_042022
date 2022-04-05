const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

// Mongoose

mongoose.connect('mongodb+srv://ArcheoDev:Africaromana_89!@cluster0.sq37b.mongodb.net/piiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Express

const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

  module.exports = app;