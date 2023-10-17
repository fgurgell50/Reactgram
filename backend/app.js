

const express = require("express");
const path = require("path");
const cors = require("cors");

//const result = require("dotenv").config();
const result = require('dotenv').config({ path: path.resolve(__dirname, './.env') });

if (result.error) {
    console.error('ERRO DOTENV', result.error);
  }

//console.log('DOTENV', process.env.DB_USER)
//console.log('DOTENV', process.env.PORT)
//console.log('DOTENV', process.env.DB_PASS)

const port = process.env.PORT;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection
require("./config/db.js");

// test route
app.get("/", (req, res) => {
  res.send("API Working!");
});

// routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});